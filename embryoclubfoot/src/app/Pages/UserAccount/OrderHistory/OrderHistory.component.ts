import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { HttpClient } from '@angular/common/http';
import { baseurl } from 'src/app/AdminPanel/Models/basurl.data';
import { AdminPanelServiceService } from 'src/app/AdminPanel/Service/AdminPanelService.service';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { ToastaService } from 'ngx-toasta';



@Component({
   selector: 'app-OrderHistory',
   templateUrl: './OrderHistory.component.html',
   styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {

   ReservationHistory: any[] = []
   i: number = 0
   // displayedColumns: string[] = ['position', 'orderid', 'name', 'price', 'status','action'];
   displayedColumns: string[] = ['position', 'StartReservation', 'EndReservation', 'Price', 'status', 'action'];
   dataSource;
   popUpConfirmResponse;

   constructor(
      private accountService: AccountService,
      private http: HttpClient,
      private adminService: AdminPanelServiceService,
      private genericservice: AdminGenericService,
      private toastyService: ToastaService
   ) { }

   ngOnInit() {
      this.list().subscribe(
         res => {
            this.ReservationHistory = res.Reservations
            console.log(this.ReservationHistory);
            this.dataSource = this.ReservationHistory;

         },
         err => {
            console.log(err);

         });

   }


   list(): any {
      let payload = this.accountService.getPayload();
      return this.http.get(baseurl + '/client/' + payload.UserID);
   }

   cancelReservation(element: string) {
      this.adminService.cancelDialog("Are you sure you want to cancel this reservation ?")
      .subscribe(
         res => {
            this.popUpConfirmResponse = res;
            
         },
         err => console.log(err),
         () => this.getCancelResponse(this.popUpConfirmResponse, element)
      );
   }

   getCancelResponse(response: string, element: any) {
      if (response) {
         element.status = "Cancelled";
         this.genericservice.put(baseurl + '/Reservations/' + element.IdReservation, element)
            .subscribe(res => {
               this.toastyService.success({
                  title: "Reservation Cancelled",
                  msg: "Reservation has been Cancelled successfully!",
                  showClose: true,
                  timeout: 3000,
                  theme: "material"
               });
               console.log('Successfull Edit')
            },
               err => console.log(err)
            )
      }
   }

   confirmReservation(element: string) {

      this.adminService.confirmDialog("Are you sure you want to confirm this reservation ?")
         .subscribe(
            res => {
               this.popUpConfirmResponse = res;
               
            },
            err => console.log(err),
            () => this.getConfirmResponse(this.popUpConfirmResponse, element)
         );
   }

   getConfirmResponse(response: string, element: any) {
      if (response) {
         element.status = "Confirmed";
         this.genericservice.put(baseurl + '/Reservations/' + element.IdReservation, element)
            .subscribe(res => {
               console.log('Successfull Edit')
               this.toastyService.success({
                  title: "Reservation Confirmed",
                  msg: "Reservation has been Confirmed successfully!",
                  showClose: true,
                  timeout: 3000,
                  theme: "material"
               });
            },
               err => console.log(err)
            )
      }
   }
}
