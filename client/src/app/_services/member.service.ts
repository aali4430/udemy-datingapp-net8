import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../_models/Member';
import { of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService  {
  private http = inject(HttpClient);
  private baseUrl =environment.apiUrl;
  private userName:string="";

 members = signal<Member[]>([]);

 getMembers()
  {
    return this.http.get<Member[]>(this.baseUrl+ "users/").subscribe({
           next:mbrs=>{
             this.members.set(mbrs);
             console.log("GETTING MEMBERS:"+this.members().length);
           }
         });

  }

  // getMembersAsSignal()
  // {
  //   return this.http.get<Member[]>(this.baseUrl+ "users/").subscribe({
  //     next:mbrs=>{
  //       this.members.set(mbrs);
  //     }
  //   });

  // }

  getMember(username:string)
  {
username = username.toLowerCase();
console.log("SELECTED MEMBER:"+username);
this.userName=username;
console.log("ALL MEMBERS:"+this.members().length);
    const localMember = this.members().find(x=>x.username.toLowerCase()===username.toLowerCase());
    console.log('THIS IS MEMBER:'+localMember);
    if(localMember!==undefined) return of(localMember); // return observeable using of function
    return     this.http.get<Member>(this.baseUrl+ "users/"+username);

  }
  updateMember(member:Member)
  {
//username = username.toLowerCase();
    return     this.http.put<Member>(this.baseUrl+ "users/"+this.userName,member).pipe(tap(()=>{
      this.members.update(members=>members.map(m=>m.username===member.username?member:m))
    }));

  }
  constructor()
  {
    console.log("Creating member service");
  }
  
};
