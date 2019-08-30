import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  userDetails;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.accountService.getUserProfile().subscribe(
      res => this.userDetails = res,
      err => console.log(err));
  }

}
