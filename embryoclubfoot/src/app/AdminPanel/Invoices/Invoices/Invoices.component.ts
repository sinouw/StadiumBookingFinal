import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdminGenericService } from '../../Service/AdminGeneric.service';
import { baseurl } from '../../Models/basurl.data';
import { Reservation } from '../../Models/Reservation.model';
import { ReservationService } from '../../Service/reservation.service';
import { JsonPipe } from '@angular/common';
import { ToastOptions, ToastaService } from 'ngx-toasta';
import { AccountService } from '../../Service/account.service';

@Component({
   selector: 'app-invoices',
   templateUrl: './Invoices.component.html',
   styleUrls: ['./Invoices.component.scss']
})

export class InvoicesComponent implements OnInit {
   clubs
   collaborationData
   popUpNewResResponse: any;
   popUpDeleteUserResponse: any;
   invoiceList: any[] = [];
   reservations: any[] = [];
   toastOptionDelete: ToastOptions = {
      title: "Account Deleted",
      msg: "An account was deleted successfully!",
      showClose: true,
      timeout: 3000,
      theme: "material"
   };
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: false }) sort: MatSort;

   dataSource = new MatTableDataSource<any>(this.invoiceList);

   displayedColumns: string[] = ['Name', 'Type', 'FullName','Email', 'StartRes', 'EndRes','Duration', 'Price', 'status', 'action'];

   constructor(public service: AdminPanelServiceService,
      private genericservice: AdminGenericService,
      private reservationservice: ReservationService,
      private account: AccountService,
      private toastyService: ToastaService,
   ) {
      this.getDataInfo()
   }

   ngOnInit() {
   }


   getReservations() {
      if (this.account.getPayload().role == "SuperAdmin") {
         this.genericservice.get(baseurl + '/Reservations?$select=Client&$expand=Client($select=FullName,Email)&$expand=terrain($select=Name,Type,Price,IdClub)&$select=Price,status,StartReservation,EndReservation,IdReservation,Duration')
         .subscribe(
            res => {
               this.reservations = res;
               console.log(this.reservations);
               
            },
            err => console.log(err)
         );
      } else {
         this.genericservice.get(baseurl + '/Reservations/GetReservationsByClubAdmin/' + this.account.getPayload().UserID + "?$select=StartReservation,EndReservation,status,Price&$expand=Client($select=FullName,Email),Terrain($expand=club($select=ClubAdminId))")
         .subscribe(
            res => {
               this.reservations = res;
            },
            err => console.log(err)
         );
      }
   }
   getDataInfo() {
      this.getReservations();
      setTimeout(() => {
         this.service.getInvoiceContent().valueChanges().subscribe(rest => this.getInvoiceData(rest));
      }, 3000);
   }

   //getInvoiceData method is used to get the invoice list data.
   getInvoiceData(response) {
      // this.invoiceList = response;
      this.reservations.forEach(el => {
         let invoice = {
            IdReservation: el.IdReservation,
            FullName: el.Client.FullName,
            Email: el.Client.Email,
            Name: el.Terrain.Name,
            Type: el.Terrain.Type,
            Duration: Math.round(el.Duration*100)/100,
            IdClub: el.Terrain.IdClub,
            status: el.status,
            StartRes: el.StartReservation,
            EndRes: el.EndReservation,
            Price: Math.round(el.Price*100)/100
         }

         this.invoiceList.push(invoice);
      });
      this.dataSource = new MatTableDataSource<any>(this.invoiceList);

      setTimeout(() => {
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      }, 0)

   }
	/** 
     *onDelete method is used to open a delete dialog.
     */
   onDelete(id, i) {
      this.service.deleteDialog("Are you sure you want to delete this invoice permanently?").
         subscribe(res => { this.popUpDeleteUserResponse = res },
            err => console.log(err),
            () => this.getDeleteResponse(id, this.popUpDeleteUserResponse, i))
   }

   /**
     * getDeleteResponse method is used to delete a invoice from the invoice list.
     */
   getDeleteResponse(id, response: string, i) {
      if (response == "yes") {
         this.dataSource.data.splice(i, 1);
         this.reservationservice.DeleteReservation(id)
         this.dataSource = new MatTableDataSource(this.dataSource.data);
         this.dataSource.paginator = this.paginator;
         this.toastyService.success(this.toastOptionDelete);
      }
   }

   /**
     * onSeeDialog method is used to open a see dialog.
     */
   onSeeDialog() {
      this.service.seeList();
   }

   //applyFilter function can be set which takes a data object and filter string and returns true if the data object is considered a match.
   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }


   /** 
  * addNewUserDialog method is used to open a add new Reservation dialog.
  */
   addNewReservationDialog() {
      this.service.addNewReservationDialog().
         subscribe(res => {
         this.popUpNewResResponse = res;
         },
            err => console.log(err),
            () => this.getAddResPopupResponse(this.popUpNewResResponse))

   }

   getAddResPopupResponse(response: any) {
      if (response) {
         this.invoiceList = []
         this.getDataInfo()
      }
   }

   EditReservationDialog(reservation) {

      this.service.putreservation(reservation.IdReservation)


      this.service.EditReservationDialog().
         subscribe(res => {
         this.popUpNewResResponse = res;
         },
            err => console.log(err),
            () => this.getResPopupResponse(this.popUpNewResResponse))

   }
   getResPopupResponse(response: any) {
      if (response) {


         this.invoiceList = []
         this.getDataInfo()


      }
   }
}
