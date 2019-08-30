import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminGenericService } from '../../Service/AdminGeneric.service';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { baseurl } from '../../Models/basurl.data';
import { ToastaService } from 'ngx-toasta';
import { AccountService } from '../../Service/account.service';
import { EmbryoService } from 'src/app/Services/Embryo.service';


@Component({
  selector: 'app-terrains',
  templateUrl: './Terrains.component.html',
  styleUrls: ['./Terrains.component.scss']
})
export class TerrainsComponent implements OnInit {
  private baseUrl: string = baseurl;

  popUpNewTerrainResponse: any;
  popUpEditClubResponse: any;

  terrainsList: any;
  terrainsGrid: any;

  popUpDeleteTerrainResponse: any;
  clubId: any;

  showType: string = 'list';
  displayedTerrainColumns: string[] = ['Name', 'Type', 'Free', 'Price', 'ClubName', 'Action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private terrainService: AdminGenericService,
    private accountService: AccountService,
    private http: HttpClient,
    private toastyService: ToastaService,
    private service : EmbryoService
  ) { 

  }

  ngOnInit() {

    this.route.params.subscribe(res => {
      this.clubId = res.id;
      console.log(this.clubId);
    });

    this.getTerrainBaseOnIdOrOnList();
    this.service.ClubID=null
    
  }

  public getTerrainBaseOnIdOrOnList() {
    if(this.clubId != null) {
      this.list("?$expand=club&$filter=IdClub eq "+this.clubId).subscribe( res => {
        
        if(res.length != 0) {
          this.getTerrainResponse(res);
          console.log(res);
        }
      });
    } else {
      if(this.accountService.getPayload().role == "ClubAdmin"){
        this.list("?$filter=club/ClubAdminId eq "+this.accountService.getPayload().UserID).subscribe( res => {
          this.getTerrainResponse(res);
          console.log(res);
        });
      }else{
        this.list("?$expand=club").subscribe( res => {
          this.getTerrainResponse(res);
          console.log(res);
        });
      }
    }
  }

  public list(request: string): any {
    console.log("Request : "+request);
    // if(this.accountService.getPayload().role == "SuperAdmin") {
      return this.terrainService.get(this.baseUrl + '/terrains' + request);
    // }
    // } else {
      // return this.terrainService.get(this.baseUrl + "/Clubs/"+ this.accountService.getPayload().UserID+"?$select=IdTerrain,Name,Type,Free,Price&$expand=club($select=Name)");
    // }
  }

  // getTerrainResponse method is used to get the response of all Terrains.
  public getTerrainResponse(response) {
    console.log(response);
    this.terrainsGrid = null;
    this.terrainsGrid = response;
    this.terrainShowType(this.showType);
  }

  /**
  * terrainShowType method is used to select the show type of club.
  */
  terrainShowType(type) {
    this.showType = type;
    if (type == 'list') {
      document.getElementById('list').classList.add("active");
      document.getElementById('grid').classList.remove('active');

        this.terrainsList = new MatTableDataSource(this.terrainsGrid);
     
      setTimeout(() => {
        this.terrainsList.paginator = this.paginator;
        this.terrainsList.sort = this.sort;
      }, 0)

    }
    else {
      document.getElementById('grid').classList.add("active");
      document.getElementById('list').classList.remove('active');
    }
    this.showType = type;
    if (type == 'list') {
      document.getElementById('list').classList.add("active");
      document.getElementById('grid').classList.remove('active');
      this.terrainsList = new MatTableDataSource(this.terrainsGrid);
      console.log(this.terrainsList);
      setTimeout(() => {
        this.terrainsList.paginator = this.paginator;
        this.terrainsList.sort = this.sort;
      }, 0);
    }
    else {
      document.getElementById('grid').classList.add("active");
      document.getElementById('list').classList.remove('active');
    }
  }

  // applyFilter function can be set which takes a data object and filter string and returns true if the data object is considered a match.
  applyFilter(filterValue: string) {
    this.terrainsList.filter = filterValue.trim().toLowerCase();

    if (this.terrainsList.paginator) {
      this.terrainsList.paginator.firstPage();
    }
    this.terrainsList.filter = filterValue.trim().toLowerCase();

    if (this.terrainsList.paginator) {
      this.terrainsList.paginator.firstPage();
    }
  }


   /**
   * Les Services des terrains
   *  
   */
  public create(terrain: any) {
    if(this.clubId!=null){
      this.service.putClubId(this.clubId)
    }
    this.terrainService.addNewTerrainDialog().
    subscribe(res => { this.popUpNewTerrainResponse = res },
      err => console.log(err),
      () =>{ 
        this.getAddClubPopupResponse(this.popUpNewTerrainResponse)
        
        })

  }

  getAddClubPopupResponse(response: any) {
    // this.service.ClubID=null
    if (response) {
      console.log(response);
      let addTerrain;

      this.terrainService.post(this.baseUrl + '/terrains', response).subscribe(
        result => {
          
          addTerrain = result;
          console.log(result);
          // this.terrainsGrid.push(addTerrain);
          this.getTerrainBaseOnIdOrOnList();
          this.terrainShowType(this.showType);
          
        }, error => {
          console.log(error);
        });
    }
  }

  // public update(terrain: any, id: string): Observable<any> {
  //   return this.terrainService.put(this.baseUrl + '/terrains/' + id, terrain);
  // }

  public read(id: string): Observable<any> {
    return this.terrainService.get(this.baseUrl + '/terrains');
  }



  /**
   *  Delete Service
   */
  public delete(id: string, i: number) {
    this.terrainService.deleteDialog("Are you sure you want to delete this terrain permanently?")
    .subscribe(
      res => { this.popUpDeleteTerrainResponse = res },
      err => console.log(err),
      () => this.getDeleteResponse(this.popUpDeleteTerrainResponse, i, id)
    );
  }

  /**
    * getDeleteResponse method is used to delete a product from the product list.
    */
   getDeleteResponse(response: string, i, id) {
    if (response == "yes") {
      if (this.showType == 'grid') {
        this.terrainService.delete(this.baseUrl + '/terrains/' + id).subscribe(result => {
          console.log(result);
          this.toastyService.success({
            title: "Delete Terrain",
            msg: "Terrain has been deleted successfully!",
            showClose: true,
            timeout: 3000,
            theme: "material"
          });
        }, error => {
          console.log(error);
        });
        this.terrainsGrid.splice(i, 1);

      } else if (this.showType == 'list') {
        this.terrainService.delete(this.baseUrl + '/terrains/' + id).subscribe(result => {
          console.log(result);
          this.toastyService.success({
            title: "Delete Terrain",
            msg: "Terrain has been deleted successfully!",
            showClose: true,
            timeout: 3000,
            theme: "material"
          });
        }, error => {
          console.log(error);
        });
        this.terrainsList.data.splice(i, 1);
        this.terrainsList = new MatTableDataSource(this.terrainsList.data);
        this.terrainsList.paginator = this.paginator;

      }
    }
  }

  onEditProduct(id){
    console.log(id);
    this.router.navigate(['/admin-panel/terrain-edit',id]);
	}
}
