import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AdminGenericService } from '../../Service/AdminGeneric.service';
import { baseurl } from '../../Models/basurl.data';
import { ToastaService } from 'ngx-toasta';

@Component({
  selector: 'app-edit-terrain',
  templateUrl: './edit-terrain.component.html',
  styleUrls: ['./edit-terrain.component.css']
})
export class EditTerrainComponent implements OnInit {
  //Code For the validators
  emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  namePattern: any = /^[A-Za-z0-9_]*$/;
  typePattern: any = /^[A-Za-z]*$/;
  floatPattern: any = /^-?(0|[1-9]\d*)?.-?(0|[1-9]\d*)?$/;
  //Attributes
  EditTerrainForm : FormGroup;
  TerrainId

  constructor(
    private service: AdminGenericService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private toastyService: ToastaService,
  ) { 
       
    this.route.params.subscribe(res => {
      this.TerrainId = res.id;
      console.log(this.TerrainId)
    })
  
    this.EditTerrainForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      Type: ['', [Validators.required, Validators.pattern(this.typePattern)]],
      Free: ['', [Validators.required]],
      Price: ['', [Validators.required, Validators.pattern(this.floatPattern)]],
      IdClub: ['', [Validators.required]],
      IdTerrain: ['', [Validators.required]]
    })
  
    this.getTerrainDetail();
  }

  ngOnInit() {

  }

  getTerrainDetail() {
    this.service.get(baseurl + '/terrains/' + this.TerrainId).subscribe(
      result => {
        this.EditTerrainForm.patchValue({
          Name: result.Name,
          Type: result.Type,
          Free: result.Free,
          Price: result.Price,
          IdClub: result.IdClub,
          IdTerrain: this.TerrainId,
        });
        console.log(result);
      }, error => {
        console.log(error);
      });
  }

  updateTerrain() {
   console.log(this.TerrainId);
   
     this.service.put(baseurl+`/terrains/${this.TerrainId}`,this.EditTerrainForm.value)
     .subscribe(res=>{
       console.log(res)
       this.toastyService.success({
        title: "Edit Terrain",
        msg: "Terrain has been Edited successfully!",
        showClose: true,
        timeout: 3000,
        theme: "material"
      });
      },
      err=>{
        this.toastyService.error({
          title: "Edit Terrain",
          msg: "Error in the Editing of the Terrain!",
          showClose: true,
          timeout: 3000,
          theme: "material"
        });
        console.log(err)
      })
  }


  backClicked() {
    this._location.back();
  }


}

