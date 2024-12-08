import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { NgxSpinner, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NavComponent, HomeComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'Angular Client';
  http = inject(HttpClient);
  accountService = inject(AccountService);

  ngOnInit(): void {
    //this.getUsers();
    this.setCurrentUser();
  }
  setCurrentUser(){
    var userstring = localStorage.getItem("LoggedInUser");
    if(!userstring) return;
    const user = JSON.parse(userstring);
    this.accountService.LoggedInUser.set(user);
  }
  
}
