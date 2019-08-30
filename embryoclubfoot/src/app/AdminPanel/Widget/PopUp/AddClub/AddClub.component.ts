import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { baseurl } from 'src/app/AdminPanel/Models/basurl.data';


@Component({
  selector: 'app-add-club',
  templateUrl: './AddClub.component.html',
  styleUrls: ['./AddClub.component.scss']
})
export class AddClubComponent implements OnInit {
  addClubForm: FormGroup;
  clubadmins
  cities : any[]=[]
  // Patterns List
  emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  namePattern: any = /^[A-Za-z0-9_]*$/;
  numberPattern: any = /^-?(0|[1-9]\d*)?$/;
  lnglatPattern: any = /^[0-9.]*$/;

  
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddClubComponent>,
    private accountService: AccountService,
    private service : AdminGenericService
  ) { }

  ngOnInit() {




    this.service.get(baseurl+'/clubadmin?$select=Id,UserName')
    .subscribe(res=>{
      console.log(res);
      this.clubadmins=res
    },
    err=>{console.log(err)})

    this.service.get(baseurl+'/Addresses?$select=city')
    .subscribe(res=>{
      console.log(res);
      res.map(c=> this.cities.push(c.city))
    },
    err=>{console.log(err)})



    if (this.accountService.getPayload().role == "ClubAdmin") {
      this.addClubForm = this.formBuilder.group({
        Name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
        Address: ['', [Validators.required]],
        City: ['',[Validators.required]],
        Phone: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
        Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        OpeningTime: [''],
        ClosingTime: [''],
        lat: '',
        lng: '',
        IsActive: ['', [Validators.required]],
      })
    }
    if (this.accountService.getPayload().role == "SuperAdmin") {
      this.addClubForm = this.formBuilder.group({
        ClubAdminId: ['',Validators.required],
        Name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
        Address: ['', [Validators.required]],
        City: ['',[Validators.required]],
        Phone: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
        Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        OpeningTime: [''],
        ClosingTime: [''],
        lat: '',
        lng: '',
        IsActive: ['', [Validators.required]],
      })
    }
    
  }

  // onFormSubmit method is submit a add new user form.
  onFormSubmit() {
    let body: any;
    if (this.accountService.getPayload().role == "ClubAdmin") {
      body = {
        Name: this.addClubForm.value.Name,
        Address: this.addClubForm.value.Address,
        Phone: this.addClubForm.value.Phone,
        Email: this.addClubForm.value.Email,
        OpeningTime: this.addClubForm.value.OpeningTime,
        ClosingTime: this.addClubForm.value.ClosingTime,
        lng: this.addClubForm.value.lng,
        lat: this.addClubForm.value.lat,
        City: this.addClubForm.value.City,
        IsActive: this.addClubForm.value.IsActive,
        ClubAdminId: this.accountService.getPayload().UserID,
      };

    }
    if (this.accountService.getPayload().role == "SuperAdmin") {
      body = {
        Name: this.addClubForm.value.Name,
        Address: this.addClubForm.value.Address,
        Phone: this.addClubForm.value.Phone,
        Email: this.addClubForm.value.Email,
        OpeningTime: this.addClubForm.value.OpeningTime,
        ClosingTime: this.addClubForm.value.ClosingTime,
        lng: this.addClubForm.value.lng,
        lat: this.addClubForm.value.lat,
        City: this.addClubForm.value.City,
        IsActive: this.addClubForm.value.IsActive,
        SuperAdminId: this.accountService.getPayload().UserID,
        ClubAdminId: this.addClubForm.value.ClubAdminId
      };

    }
    this.dialogRef.close(body);
  }
}
