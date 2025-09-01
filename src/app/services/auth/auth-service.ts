import { Injectable } from '@angular/core';
import { LoginInfo } from '../../models/login-info.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router){}
  getLoginInfo(): LoginInfo | undefined {
    const loginInfo = localStorage.getItem('loginInfo');
    if(loginInfo == null){
      return undefined;
    }
    return JSON.parse(loginInfo);
  }

  isLoggedIn(): boolean{
    const loginInfo = this.getLoginInfo();
    return loginInfo != undefined;
  }

  getFullName(){
    return this.getLoginInfo()?.fullname;
  }

  logout(){
    localStorage.removeItem('loginInfo');
    this.router.navigateByUrl('/login');
  }
}
