import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { HttpClient } from '@angular/common/http';
import { ToastaService } from 'ngx-toasta';
import { baseurl } from 'src/app/AdminPanel/Models/basurl.data';
import { ReservationService } from 'src/app/AdminPanel/Service/reservation.service';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { EmbryoService } from 'src/app/Services/Embryo.service';
import { ReservsationService } from 'src/app/Services/reservsation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-reservation-client',
  templateUrl: './add-reservation-client.component.html',
  styleUrls: ['./add-reservation-client.component.scss']
})
export class AddReservationClientComponent implements OnInit {
  // reservationId : string
  addReservationForm: FormGroup;
  emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  clubsname: any
  clubs: any;
  terrains: any[] = [];
  clients;
  IdTerrain;
  startreservation

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddReservationClientComponent>,
    private clubService: AdminGenericService,
    private embryoService: EmbryoService,
    private accountService: AccountService,
    private toastyService: ToastaService,
    private genericservice: AdminGenericService,
    private route: ActivatedRoute,
    private router: Router,
    private resservice : ReservsationService,
    public datePipe: DatePipe

  ) { }

  ngOnInit() {
    
    let res = this.resservice.StartReservation
    let d =([ res.getFullYear(), this.pad(res.getMonth() + 1), this.pad(res.getDate())].join('-'))+'T'+([this.pad(res.getHours())+':'+this.pad(res.getMinutes())]);
    this.startreservation=d

    console.log(this.startreservation);

    // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------

    this.addReservationForm = this.formBuilder.group({
      StartReservation: [this.startreservation, [Validators.required]],
      Duration: ['', [Validators.required]],
      ExtraTime : ['', [Validators.required]]
    })

    this.IdTerrain = this.embryoService.IdTerrain;

    this.route.params.subscribe(res => {
      this.IdTerrain = res.id;
    });
  }

  pad(s) { return (s < 10) ? '0' + s : s; }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day > d.getDate()
  }

  // onFormSubmit method is submit a add new user form.
  onFormSubmit() {
    //Duree
    let dur =this.addReservationForm.value.Duration
    let extra = this.addReservationForm.value.ExtraTime
    //To Add Hours
    let ToAddhours  = new Date(this.addReservationForm.value.StartReservation).getHours()+Number(dur.split(":")[0])
    let endRes = new Date(new Date(this.addReservationForm.value.StartReservation).setHours(ToAddhours))     
    console.log("Duration"+this.addReservationForm.value.Duration);
    //To Add Minutes
     let ToAddMinutes  = new Date(endRes).getMinutes()+Number(dur.split(":")[1])+Number(extra.split(":")[1])
    endRes = new Date(endRes.setMinutes(ToAddMinutes))         
    // console.log("endRes: "+endRes);
    

    let d =([ endRes.getFullYear(), this.pad(endRes.getMonth() + 1), this.pad(endRes.getDate())].join('-'))+'T'+([this.pad(endRes.getHours())+':'+this.pad(endRes.getMinutes())]);
    //  console.log("d : "+d)
    
    
    
    const body = {
      IdClient: this.accountService.getPayload().UserID,
      IdTerrain: this.embryoService.IdTerrain,
      StartReservation: this.addReservationForm.value.StartReservation,
      EndReservation: d,
      status: "Confirmed"
    }

    console.log(body)
    this.genericservice.post(baseurl + '/Reservations', body)
      .subscribe(res => {
        this.resservice.putEndStart(body.StartReservation,body.EndReservation)
        console.log('Added Successfully')
      },
        err => console.log(err))
    this.dialogRef.close(this.addReservationForm.value);
    // this.router.navigate(['/account/order-history']);
  }

}
