import { Component, OnInit } from '@angular/core';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';
import { MatTableDataSource } from '@angular/material';
import { AccountService } from '../../Service/account.service';
import { HttpClient } from '@angular/common/http';
import { ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';

@Component({
	selector: 'app-collaboration',
	templateUrl: './Collaboration.component.html',
	styleUrls: ['./Collaboration.component.scss']
})

export class CollaborationComponent implements OnInit {
	
	popUpDeleteUserResponse : any;
	popUpNewUserResponse    : any; 
   collaborationData		: any [];
   toastOptionDelete  : ToastOptions = {
      title     : "Account Deleted",
      msg       : "An account was deleted successfully!",
      showClose : true,
      timeout   : 3000,
      theme     : "material"
   };
   

	// displayedColumns : string[] = ['image', 'name', 'email', 'access', 'action'];
	displayedColumns : string[] = ['FullName', 'Email','PhoneNumber', 'Role' , 'action'];

	dataSource = new MatTableDataSource<any>(this.collaborationData);

   constructor(public service : AdminPanelServiceService,
      private accountService : AccountService,
      private http : HttpClient,
      private toastyService: ToastaService) {
         this.getUsersInfo()
       }

	ngOnInit() {
      // this.getUsersInfo()
   }
   
   getUsersInfo(){
      this.accountService.GetUsers()
		this.service.getCollaborationContent().valueChanges().subscribe(res => this.getCollaborationData(res));
   }

   //getCollaborationData method is used to get the collaboration data.
   getCollaborationData(response){
      
      // this.collaborationData = response;
      this.collaborationData = this.accountService.Users;
      this.dataSource = new MatTableDataSource<any>(this.collaborationData);
   }
	/** 
     *onDelete method is used to open a delete dialog.
     */
   onDelete(Id,i){     
      this.service.deleteDialog("Are you sure you want to delete this user permanently?").
         subscribe( res => 
            {this.popUpDeleteUserResponse = res},
                    err => console.log(err),
                    ()  => {this.getDeleteResponse(Id,this.popUpDeleteUserResponse,i)})
   }

   /**
     * getDeleteResponse method is used to delete a user from the user list.
     */
   getDeleteResponse(Id : string,response : string,i){
      if(response == "yes"){
         this.dataSource.data.splice(i,1);
         console.log(i)
         this.accountService.DeleteUser(Id)
         this.toastyService.success(this.toastOptionDelete);
         this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
   }

   /** 
     * addNewUserDialog method is used to open a add new client dialog.
     */   
   addNewUserDialog() {
      this.service.addNewUserDialog().
         subscribe( res => {this.popUpNewUserResponse = res;
            // this.getUsersInfo()
         },
                    err => console.log(err),
                     ()  => this.getAddUserPopupResponse(this.popUpNewUserResponse))
                
   }
getAddUserPopupResponse(response: any){
      if(response){
         let addUser = {
            FullName : response.FullName,
            Email : response.Email,
            PhoneNumber : response.PhoneNumber,
            Role : response.Role,
            IsActive : response.IsActive
         }
         this.collaborationData.push(addUser);
         this.dataSource = new MatTableDataSource<any>(this.collaborationData);     
      }
   }

   ChangeStatus(Id : string,i : number){
   this.http.put(this.accountService.BaseURI+'/User/ToggleStatus/'+Id,null)
     .subscribe(res=>{
      this.collaborationData[i]=res
      this.dataSource = new MatTableDataSource<any>(this.collaborationData);
   },
     err=>{
      console.log(err)  
     })
      }
     

     
   
}
