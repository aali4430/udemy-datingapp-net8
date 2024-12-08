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
memberService:MemberService= inject(MemberService);
toastr:ToastrService =  inject(ToastrService);



ngOnInit(): void {
  if(this.memberService.members().length===0) 
  this.getMembers();
}
getMembers(){
  this.memberService.getMembers();

}
}
