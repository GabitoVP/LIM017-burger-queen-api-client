import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { Observable } from 'rxjs';
import { Users } from '../models/employees';
import { UsersLogin } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:8080/login';
  // private url = 'https://virtserver.swaggerhub.com/ssinuco/BurgerQueenAPI/2.0.0/login'

  constructor(private http: HttpClient) { }

  postUsers(data: UsersLogin): Observable<any> {
    return this.http.post<UsersLogin>(this.url,data);
  }
  isLoggedIn(){
   return localStorage.getItem('roles')!= null
  }

  haveRoleAccess(pathName:any){
    const userRole = localStorage.getItem('roles')
    if(userRole==='admin' && pathName ==='admin'){
       return true;
    } else if(userRole==='waiter' && pathName ==='waiter'){
      return true
    }else if(userRole==='chef' && pathName ==='chef'){
      return true
    }
    return false;
    }
}
