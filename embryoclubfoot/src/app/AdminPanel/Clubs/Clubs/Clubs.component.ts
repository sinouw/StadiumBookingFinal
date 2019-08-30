import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminGenericService } from '../../Service/AdminGeneric.service';
import { Observable } from 'rxjs';
import { Club } from '../../Models/Club.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastaService } from 'ngx-toasta';
import { baseurl } from '../../Models/basurl.data';
import { AccountService } from '../../Service/account.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './Clubs.component.html',
  styleUrls: ['./Clubs.component.scss']
})
export class ClubsComponent implements OnInit {

  private baseUrl: string = baseurl;

  popUpNewClubResponse: any;
  popUpEditClubResponse: any;

  clubsList: any;
  clubsGrid: any;
  popUpDeleteClubResponse: any;
  showType: string = 'list';
  displayedClubColumns: string[] = ['Name', 'Address', 'Phone', 'Email', 'OpeningTime', 'ClosingTime','City','lat','lng','IsActive', 'action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private clubService: AdminGenericService,
    private accountService: AccountService,
    private http: HttpClient,
    private toastyService: ToastaService
  ) {

  }

  ngOnInit() {
    this.list().subscribe(res => { 
      this.getClubResponse(res) 
    });
    console.log(this.clubsGrid);
    
  }

  //getProductResponse method is used to get the response of all products.
  public getClubResponse(response) {
    console.log(response);
    this.clubsGrid = null;
    this.clubsGrid = response;
    this.clubShowType(this.showType);
  }

  /**
  * clubShowType method is used to select the show type of club.
  */
  clubShowType(type) {
    this.showType = type;
    if (type == 'list') {
      document.getElementById('list').classList.add("active");
      document.getElementById('grid').classList.remove('active');
      this.clubsList = new MatTableDataSource(this.clubsGrid);
      setTimeout(() => {
        this.clubsList.paginator = this.paginator;
        this.clubsList.sort = this.sort;
      }, 0)

    }
    else {
      document.getElementById('grid').classList.add("active");
      document.getElementById('list').classList.remove('active');
    }
  }

  //applyFilter function can be set which takes a data object and filter string and returns true if the data object is considered a match.
  applyFilter(filterValue: string) {
    this.clubsList.filter = filterValue.trim().toLowerCase();

    if (this.clubsList.paginator) {
      this.clubsList.paginator.firstPage();
    }
  }


  /**
   * Les Services des clubs
   *  
   */
  public create() {
    this.clubService.addNewClubDialog().
      subscribe(res => { this.popUpNewClubResponse = res },
        err => console.log(err),
        () => this.getAddClubPopupResponse(this.popUpNewClubResponse))
  }

  getAddClubPopupResponse(response: any) {
    if (response) {
      console.log(response);
      let addClub;
      this.clubService.post(this.baseUrl + '/clubs', response).subscribe(
        result => {
          addClub = result;
          console.log(result);
          this.clubsGrid.push(addClub);
          this.clubShowType(this.showType);
        }, error => {
          console.log(error);
        });
    }
  }



  public update(club: Club, id: string): Observable<Club> {
    return this.clubService.put(this.baseUrl + '/clubs/' + id, club);
  }

	onEditProduct(data,id){
    console.log(data);
    console.log(id);
    this.router.navigate(['/admin-panel/club-edit',id]);
	}

  read(id: string): Observable<Club> {
    return this.clubService.get(this.baseUrl + '/clubs');
  }

  list(): any {
    if(this.accountService.getPayload().role == "SuperAdmin") {
      return this.clubService.get(this.baseUrl + '/clubs');
    } else {
      return this.clubService.get(this.baseUrl + '/clubs?$filter=ClubAdminId eq ' + this.accountService.getPayload().UserID);
    }
  }

  delete(id: string, i: number) {
    this.clubService.deleteDialog("Are you sure you want to delete this club permanently?").subscribe(res => { this.popUpDeleteClubResponse = res },
      err => console.log(err),
      () => this.getDeleteResponse(this.popUpDeleteClubResponse, i, id))

  }

  /**
    * getDeleteResponse method is used to delete a product from the product list.
    */
  getDeleteResponse(response: string, i, id) {
    if (response == "yes") {
      if (this.showType == 'grid') {
        this.clubService.delete(this.baseUrl + '/clubs/' + id).subscribe(result => {
          console.log(result);
          this.toastyService.success({
            title: "Delete Club",
            msg: "Club has been deleted successfully!",
            showClose: true,
            timeout: 3000,
            theme: "material"
          });
        }, error => {
          console.log(error);
        });
        this.clubsGrid.splice(i, 1);

      } else if (this.showType == 'list') {
        this.clubService.delete(this.baseUrl + '/clubs/' + id).subscribe(result => {
          console.log(result);
          this.toastyService.success({
            title: "Delete Club",
            msg: "Club has been deleted successfully!",
            showClose: true,
            timeout: 3000,
            theme: "material"
          });
        }, error => {
          console.log(error);
        });
        this.clubsList.data.splice(i, 1);
        this.clubsList = new MatTableDataSource(this.clubsList.data);
        this.clubsList.paginator = this.paginator;

      }
    }
  }


  listTerrains(id) {
    this.router.navigate(['/admin-panel/terrains',id]);
  }

}
