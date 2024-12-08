import { Component, inject } from '@angular/core';
import { FormsModule,ReactiveFormsModule, NgForm } from '@angular/forms';

import { AccountService } from '../_services/account.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule
, RouterLink, RouterLinkActive, TitleCasePipe
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
model:any = {};
router = inject(Router);
accountService = inject(AccountService);
toasterService = inject(ToastrService)
logout(){
  this.accountService.logout();
  this.router.navigateByUrl("/");
}
login(){
  this.accountService.login(this.model).subscribe({
    next:(response)=>{void this.router.navigateByUrl("/members")},
    error:(error)=>{this.toasterService.error(error.error)},
    complete:()=>{console.log("User Logged In Successfully");}
  });
}
}
