import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { HttpClient } from '@angular/common/http';
import { ToastaService, ToastOptions } from 'ngx-toasta';
import { RegisterBody } from 'src/app/Models/RegisterUser.model';
import { Router } from '@angular/router';

@Component({
  selector: 'embryo-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerBody 		    : RegisterBody;
	addNewUserForm    	: FormGroup;
	emailPattern 		    : string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
	toastOptionAdding 	: ToastOptions = {
	title     		: "Adding Account",
	msg       		: "Account Added Successfully!",
	showClose 		: true,
	timeout   		: 3000,
	theme     		: "material"
	 };
	toastOptionAddingError  : ToastOptions = {
	title     		: "Adding Account ",
	msg       		: "Error! Account Was Not Added Successfully!!!!!!",
	showClose 		: true,
	timeout   		: 3000,
	theme     		: "material"
   };
   
  constructor( private formBuilder : FormBuilder,
		private service : AccountService,
		private http: HttpClient,
    private toastyService: ToastaService,
    private router : Router ) { }

  ngOnInit() {
    this.addNewUserForm = this.formBuilder.group({
			UserName     : ['', [Validators.required, Validators.minLength(4)]],
      FullName     : ['', [Validators.required]],
      Gender       : ['',[Validators.required]],
      PhoneNumber  : ['', [Validators.required]],
			Email        : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
			Password: ['', [Validators.required, Validators.minLength(4)]],
			ConfirmPassword: ['', [Validators.required]],
		},{ validator  : this.comparePasswords },)
  }
  comparePasswords(fb: FormGroup) {
		let confirmPswrdCtrl = fb.get('ConfirmPassword');
		//passwordMismatch
		//confirmPswrdCtrl.errors={passwordMismatch:true}
		if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
		  if (fb.get('Password').value != confirmPswrdCtrl.value)
			{
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
			  console.log('dismatch')
			}
		  else
			{
        confirmPswrdCtrl.setErrors(null);
			  console.log('No errors')
		  }
		}
  }
  registerForUser() {
	
		return this.http.post(this.service.BaseURI + `/Client/register`, this.registerBody)
		.subscribe(res=>{
      console.log(res)
      this.toastyService.success(this.toastOptionAdding);
      this.router.navigateByUrl('/session/signin')
		},
		err=>{
      console.log(err)
      this.toastyService.error(err);
    
    });
  }
  
  // onFormSubmit method is submit a add new user form.
	onFormSubmit(){
		this.registerBody = {
			UserName : this.addNewUserForm.value.UserName,
			FullName : this.addNewUserForm.value.FullName,
			Gender : this.addNewUserForm.value.Gender,
			PhoneNumber : this.addNewUserForm.value.PhoneNumber,
			Email : this.addNewUserForm.value.Email,
			Password : this.addNewUserForm.value.Password,
			Role : 'Client'
		}
		console.log(this.registerBody);
		
		 this.registerForUser()

	}
}
