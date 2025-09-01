import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountData, LoginInfo } from '../../models/login-info.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts : AccountData[] = [
    {
      username : "user1",
      password : "user123",
      fullname : "User 1"
    }
];

  login(username: string, password: string){
    console.log(this.accounts);
    
    var res = {
      data : {},
      responseCode : 404
    }
    var acc = this.accounts.find(acc => acc.username == username && acc.password == password);
    if (acc != undefined){
      var loginInfo : LoginInfo = {
        username : acc.username,
        fullname : acc.fullname
      };
      localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
      res.data = loginInfo;
      res.responseCode = 200;
    }
    return of(res);
  }

  createNewAccount(newData: AccountData){
    this.accounts.push(newData);
  }

}
