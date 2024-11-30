import { Component, inject } from '@angular/core';
import { FormsModule,ReactiveFormsModule, NgForm } from '@angular/forms';

import { AccountService } from '../_services/account.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
model:any = {};

accountService = inject(AccountService);

logout(){
  this.accountService.logout();
}
login(){
  this.accountService.login(this.model).subscribe({
    next:(response)=>{console.log(response);},
    error:(error)=>{console.log(error)},
    complete:()=>{console.log("User Logged In Successfully");}
  });
}
}
