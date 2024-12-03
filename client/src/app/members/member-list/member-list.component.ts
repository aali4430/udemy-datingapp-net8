import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../_services/member.service';
import { Member } from '../../_models/Member';
import { ToastrService } from 'ngx-toastr';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
memberService =  inject(MemberService);
toastr =  inject(ToastrService);
members:any=[];
ngOnInit(): void {
  this.getMembers();
}
getMembers(){
  this.memberService.getMembers().subscribe({
    next:(members:Member[])=> {this.members = members;},
    error:(error)=>{this.toastr.error(error)}
  });
}
}
