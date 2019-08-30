import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';

@Component({
  selector: 'embryo-HeaderUserProfileDropdown',
  templateUrl: './HeaderUserProfileDropdown.component.html',
  styleUrls: ['./HeaderUserProfileDropdown.component.scss']
})
export class HeaderUserProfileDropdownComponent implements OnInit {

  loginStatus: boolean = false;
Route
  constructor(
    public router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.loginStatus = this.getLoginStatus();
  }

  redirectuser(){
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var role = payLoad.role

    console.log(role);
    
    if(role=="Client"){
      this.router.navigateByUrl('/account/profile');
    }
    if (role == "SuperAdmin")
    this.router.navigateByUrl('/admin-panel/account/profile');
    
  if (role =="ClubAdmin")
    this.router.navigateByUrl('/admin-panel/account/profile');
    
  

  }

  getLoginStatus() {
    return localStorage.getItem('token') != null ;
  }

  logOut() {
    localStorage.removeItem('token');
    document.getElementById('html').classList.remove("admin-panel");
    this.router.navigate(['/session/signin']);
  }
}
