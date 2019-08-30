import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../Service/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {

  User 
 constructor(private http: HttpClient,private service: AccountService) {
  this.getUser()
  }

  ngOnInit() {
  
    
     
  }
  getUser(){
    var paylaod = this.service.getPayload()
    this.http.get(this.service.BaseURI+'/User/'+paylaod.UserID).subscribe(
      res=>this.User=res,
      err=>console.log(err))
   }
}
