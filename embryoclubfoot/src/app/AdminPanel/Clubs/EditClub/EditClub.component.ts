import { Component, OnInit } from '@angular/core';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminGenericService } from '../../Service/AdminGeneric.service';
import { url } from 'inspector';
import { Club } from '../../Models/Club.model';
import { Location } from '@angular/common';
import { ToastaService } from 'ngx-toasta';
import { baseurl } from '../../Models/basurl.data';

@Component({
  selector: 'app-edit-club',
  templateUrl: './EditClub.component.html',
  styleUrls: ['./EditClub.component.scss']
})
export class EditClubComponent implements OnInit {

  private baseUrl: string = "https://localhost:44309/api";

  UserNamePattern:any =/^[A-Za-z0-9_]*$/
  NamePattern:any =/^[A-Za-z]*$/
  emailPattern : any = /\S+@\S+\.\S+/;
  NumberPattern: any = /^-?(0|[1-9]\d*)?$/

  editClubDetail: any;
  mainImgPath: string;
  clubId: any;
  clubType: any;
  showStatus: boolean;
  form: FormGroup;
  cities : any[]=[]

  constructor(
    private adminPanelService: AdminPanelServiceService,
    private clubService: AdminGenericService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private toastyService: ToastaService,

    
    ) { 
      this.clubService.get(baseurl+'/Addresses?$select=city')
      .subscribe(res=>{
        console.log(res);
        res.map(c=> this.cities.push(c.city))
      },
      err=>{console.log(err)})
  
    }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.clubId = res.id;
      console.log(this.clubId);
    })

    this.form = this.formBuilder.group({
      IdClub: [''], 
      Name: ['', [Validators.required, Validators.pattern(this.NamePattern)]],
      Address: ['', [Validators.required]],
      Phone: ['', [Validators.required, Validators.pattern(this.NumberPattern)]],
      Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      City: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      lng: ['', [Validators.required]],
      OpeningTime: [''],
      ClosingTime: [''],
      IsActive: ['', [Validators.required]],
    });

    this.getClubDetail();

  
  }

  public getClubDetail() {
    this.clubService.get(this.baseUrl + '/clubs/' + this.clubId).subscribe(
      result => {
        this.form.patchValue({
          IdClub : result.IdClub,
          Name: result.Name,
          Address: result.Address,
          Phone: result.Phone,
          Email: result.Email,
          City : result.City,
          lat : result.lat,
          lng : result.lng,
          OpeningTime: result.OpeningTime,
          ClosingTime: result.ClosingTime,
          IsActive: result.IsActive
        });
        console.log(result);
      }, error => {
        console.log(error);
      });
  }

  updateClub() {
    let addclub  = {
      IdClub : this.form.value.IdClub,
      Name : this.form.value.Name,
      Address : this.form.value.Address,
      Phone : this.form.value.Phone,
      Email : this.form.value.Email,
      City : this.form.value.City,
      lat : this.form.value.lat,
      lng : this.form.value.lng,
      OpeningTime : this.form.value.OpeningTime,
      ClosingTime : this.form.value.ClosingTime,
      IsActive : this.form.value.IsActive
   }
   console.log(addclub);
   
     this.clubService.put(this.baseUrl+`/clubs/${this.clubId}`,addclub)
     .subscribe(res=>{
      this.toastyService.success({
        title: "Edit Club",
        msg: "Club has been Edited successfully!",
        showClose: true,
        timeout: 3000,
        theme: "material"
      }); 
      console.log(res)},
      err=>{
        this.toastyService.error({
          title: "Edit Club",
          msg: "Error in the Editing of the Club!",
          showClose: true,
          timeout: 3000,
          theme: "material"
        });
        console.log(err)})
  }

  backClicked() {
    this._location.back();
  }

}
