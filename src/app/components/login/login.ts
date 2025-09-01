import { Component } from '@angular/core';
import { AccountService } from '../../services/accountService/account-service';
import { AccountData, LoginInfo } from '../../models/login-info.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationComponent } from "../shared/notification/notification";

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NotificationComponent
],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username: FormControl = new FormControl();
  password: FormControl = new FormControl();
  fullname: FormControl = new FormControl();

  isFailedLogin = false;
  isLogin: boolean = true;
  isNotifShown: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router
  ){
    this.activateFormValidation();
  }

  tryLogin(){
    this.isFailedLogin = false;
    this.accountService.login(this.username.value, this.password.value).subscribe({
      next: (res) => {
        if(res.responseCode == 200){
          this.router.navigateByUrl('/home')
        }
        else if(res.responseCode == 404){
          this.isFailedLogin = true;
        }
      }
    });
  }

  activateFormValidation(){
    this.username.valueChanges.subscribe((uname: string) => {
      this.username.setErrors({
        tooShort: uname == null || uname.length < (this.isLogin ? 1 : 4)
      });
    });
  }

  getIsFormValid(){
    var isPasswordValid = (this.password.value?.length ?? 0) > 0;
    var isFullnameValid = this.isLogin || ((this.fullname.value?.length ?? 0) > 0);
    return !(this.username.getError('tooShort') ?? true) && isPasswordValid && isFullnameValid;
  }

  createNewAccount(){
    var newData: AccountData = {
      fullname : this.fullname?.value,
      password : this.password?.value,
      username : this.username?.value
    }
    this.accountService.createNewAccount(newData);
    this.changeForm();
    this.showNotif();
    setTimeout(() => {
      this.closeNotif();
    }, 2000);
  }

  changeForm(){
    this.isLogin = !this.isLogin;
    this.username.reset();
    this.password.reset();
    this.fullname.reset();
  }

  submitForm(){
    console.log(this.isLogin);
    
    if (this.isLogin){
      this.tryLogin();
    }
    else{
      console.log('tes');
      
      this.createNewAccount();
    }
  }

  showNotif(){
    this.isNotifShown = true;
  }
  closeNotif(){
    this.isNotifShown = false;
  }

}
