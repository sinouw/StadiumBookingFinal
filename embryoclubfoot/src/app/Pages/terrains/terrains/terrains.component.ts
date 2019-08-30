import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { HttpClient } from '@angular/common/http';
import { ToastaService } from 'ngx-toasta';
import { baseurl } from 'src/app/AdminPanel/Models/basurl.data';

@Component({
  selector: 'app-terrains',
  templateUrl: './terrains.component.html',
  styleUrls: ['./terrains.component.scss']
})
export class TerrainsComponent implements OnInit {

  private baseUrl: string = baseurl;

  popUpNewTerrainResponse: any;
  popUpEditClubResponse: any;

  terrainsList: any;
  terrainsGrid: any;

  popUpDeleteTerrainResponse: any;
  clubId: any;

  showType: string = 'grid';
  displayedTerrainColumns: string[] = ['Name', 'Type', 'Free', 'Price', 'ClubName', 'Action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private terrainService: AdminGenericService,
    private http: HttpClient,
    private toastyService: ToastaService
  ) { 

  }

  ngOnInit() {

    this.route.params.subscribe(res => {
      this.clubId = res.id;
      console.log(this.clubId);
    });

    this.getTerrainBaseOnIdOrOnList();
    
  }

  public getTerrainBaseOnIdOrOnList() {
    if(this.clubId) {
      this.list("?$expand=club&$filter=IdClub eq "+this.clubId).subscribe( res => {
        if(res.length != 0) {
          this.getTerrainResponse(res);
          console.log(res);
        }
      });
    } else {
      this.list("?$expand=club").subscribe( res => {
        this.getTerrainResponse(res);
        console.log(res);
      });
    }
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

  public read(id: string): Observable<any> {
    return this.terrainService.get(this.baseUrl + '/terrains');
  }

  public list(request: string): any {
    console.log(request);
    return this.terrainService.get(this.baseUrl + '/terrains' + request);
  }

  TerrainDetail(terrain,i) {
    this.router.navigate(['/client/terrainsDetail/',terrain.IdTerrain]);
    console.log(terrain,i);
  }

    

}
