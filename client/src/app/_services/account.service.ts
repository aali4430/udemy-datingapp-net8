import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import {User} from '../_models/User'
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
 LoggedInUser = signal<User | null>(null);// (User);

 private http = inject(HttpClient);
private baseURl = environment.apiUrl;

login(model:any)
{
  return this.http.post<User>(this.baseURl + "account/login",model).pipe(
    map(user=>{
      if(user){
        localStorage.setItem("LoggedInUser",JSON.stringify(user));
        this.LoggedInUser.set(user);
      }
    }
    ))
  
}

register(model:any)
{
  return this.http.post<User>(this.baseURl + "account/register",model).pipe(
    map(user=>{
      if(user){
        localStorage.setItem("LoggedInUser",JSON.stringify(user));
        this.LoggedInUser.set(user);
      }
    return user;
    }
    ))
  
}
logout(){
  localStorage.removeItem("LoggedInUser");
  this.LoggedInUser.set(null);
}
}
