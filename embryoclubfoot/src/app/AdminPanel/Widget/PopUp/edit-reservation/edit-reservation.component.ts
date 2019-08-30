import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { HttpClient } from '@angular/common/http';
import { ToastaService } from 'ngx-toasta';
import { baseurl } from 'src/app/AdminPanel/Models/basurl.data';
import { ReservationService } from 'src/app/AdminPanel/Service/reservation.service';
import { AdminPanelServiceService } from 'src/app/AdminPanel/Service/AdminPanelService.service';
import { Reservation } from 'src/app/AdminPanel/Models/Reservation.model';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  EditReservationForm: FormGroup;
  emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  IdReservation : any
  Reservation :any 
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditReservationComponent>,
    private toastyService: ToastaService,
    private genericservice : AdminGenericService,
    private adminpanelservice : AdminPanelServiceService,
    private http : HttpClient

    ) {

      this.EditReservationForm = this.formBuilder.group({
        StartReservation: ['', [Validators.required]],
        EndReservation: ['', [Validators.required]],
        status: ['', [Validators.required]],
      })

      this.IdReservation = this.adminpanelservice.IdReservation

      this.genericservice.get(baseurl+'/Reservations/'+this.IdReservation)
      .subscribe(
        res=>{
          this.Reservation=res
          this.EditReservationForm = this.formBuilder.group({
            StartReservation: [this.Reservation.StartReservation, [Validators.required]],
            EndReservation: [this.Reservation.EndReservation, [Validators.required]],
            status: [this.Reservation.status, [Validators.required]],

          })
          
        },
        err=>{
          console.log(err);
        }
      )


     
    }

  ngOnInit() {
  }

  onFormSubmit() {  
    this.genericservice.put(baseurl+'/Reservations/'+this.IdReservation,this.EditReservationForm.value)
    .subscribe(res=>{
      let email
      let body
      if(this.EditReservationForm.value.status=='Cancelled'){
        this.genericservice.get(baseurl+'/Reservations/?$select=Client&$expand=Client($select=FullName,Email)&$select=idreservation&$filter=idreservation eq '+this.IdReservation)
        .subscribe(res=>{
  
          email = res[0].Client.Email
          body = "Hi Mr"+ res[0].Client.FullName +".......Message"
          console.log("email :"+email,"body :"+body);
     

          
          setTimeout(() => {
            this.genericservice.post(baseurl+'/Mailing/'+email,null,body)
            .subscribe(res=>console.log(res),
            err=>console.log(err))
            
          }, 3000);


        },err=>console.log(err))


      }


      console.log('Successfull Edit')
    },
    err=>console.log(err)

    )
     this.dialogRef.close(this.EditReservationForm.value);
  }

}
