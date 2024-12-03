import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../_models/Member';


@Injectable({
  providedIn: 'root'
})
export class MemberService  {
  private http = inject(HttpClient);
  private baseUrl =environment.apiUrl;

 
getMembers()
  {
    return this.http.get<Member[]>(this.baseUrl+ "users/");

  } 
  getMember(username:string)
  {
username = username.toLowerCase();
    return     this.http.get<Member>(this.baseUrl+ "users/"+username);

  }
  
};
