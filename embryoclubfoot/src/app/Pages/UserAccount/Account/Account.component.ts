import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';

@Component({
  selector: 'app-Account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {
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
