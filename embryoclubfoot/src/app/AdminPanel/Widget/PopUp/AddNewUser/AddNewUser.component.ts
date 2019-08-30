import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { HttpClient } from '@angular/common/http';
import { RegisterBody } from 'src/app/Models/RegisterUser.model';
import { ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';

@Component({
  selector: 'ms-add-new-client',
  templateUrl: './AddNewUser.component.html',
  styleUrls: ['./AddNewUser.component.scss']
})
export class AddNewUserComponent implements OnInit {
	registerBody 		: RegisterBody
	addNewUserForm    	: FormGroup;
	emailPattern 		: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
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
		public dialogRef    : MatDialogRef<AddNewUserComponent>,
      	private toastyService: ToastaService) { }

	ngOnInit() {
		this.addNewUserForm = this.formBuilder.group({
			UserName     : ['', [Validators.required, Validators.minLength(4)]],
            FullName     : ['', [Validators.required]],
            Gender       : ['',[Validators.required]],
            PhoneNumber  : ['', [Validators.required]],
			Email        : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
			Password: ['', [Validators.required, Validators.minLength(4)]],
			ConfirmPassword: ['', [Validators.required]],
			accessType   : ['',[Validators.required]]
		},{ validator  : this.comparePasswords },)
	}

	registerForUser(route : string) {
	
		return this.http.post(this.service.BaseURI + `/${route}/register`, this.registerBody)
		.subscribe(res=>{
			this.toastyService.success(this.toastOptionAdding);
		},
		err=>{
			this.toastyService.error(this.toastOptionAddingError);
		});
	}

	comparePasswords(fb: FormGroup) {
		let confirmPswrdCtrl = fb.get('ConfirmPassword');
		//passwordMismatch
		//confirmPswrdCtrl.errors={passwordMismatch:true}
		if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
		  if (fb.get('Password').value != confirmPswrdCtrl.value)
			{confirmPswrdCtrl.setErrors({ passwordMismatch: true });
			console.log('dismatch')
			console.log(fb.get('accessType').value);
			;}
		  else
			{confirmPswrdCtrl.setErrors(null);
			console.log('No errors')
			console.log(fb.get('accessType').value)
		}
		}
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
			Role : this.addNewUserForm.value.accessType,
		}
		console.log(this.registerBody.Role);
		
		this.registerForUser(this.registerBody.Role)


		this.dialogRef.close(this.registerBody);
	}
}