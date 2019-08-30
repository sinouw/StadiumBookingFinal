import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Service/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails

  constructor(private service: AccountService) { 
    this.getUser()

  }

  ngOnInit() {
  
     
  }
  getUser(){
    this.service.getUserProfile().subscribe(
      res=>this.userDetails=res,
      err=>console.log(err))
   }

}
