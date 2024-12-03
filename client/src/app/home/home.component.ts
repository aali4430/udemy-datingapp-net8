import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent 
//implements OnInit
{
//http = inject(HttpClient);
registerMode=false;
//users:any;
ngOnInit(): void {
  //this.getUsers();
  
}
cancelRegister(dataFromChildCOmponent:boolean)
{
this.registerMode = dataFromChildCOmponent
}
registerToggle(){
  this.registerMode = !this.registerMode;
  console.log(this.registerMode);
}
// getUsers(){
//   var response = this.http.get("http://localhost:5000/api/users").subscribe({
//     next:(response)=>{this.users = response},
//     error:(error)=>{console.log(error)},
//     complete:()=>{console.log("Request Completed");}
//   });
//   //throw new Error('Method not implemented.');
// }
}
