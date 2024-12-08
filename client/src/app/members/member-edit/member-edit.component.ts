import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/Member';
import { AccountService } from '../../_services/account.service';
import { MemberService } from '../../_services/member.service';
import { ToastrService } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule,FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
 @ViewChild('editForm') editForm?:NgForm; 
 @HostListener("window:beforeunload",['$event']) notify($event:any){
  if(this.editForm?.dirty)
  {
    $event.returnValue = true;
  }

 }
 member?:Member|null;
 accountService = inject(AccountService);
 memberService = inject(MemberService);
 toastrService = inject(ToastrService)
ngOnInit(): void {
  this.loadMember();
}
updateMember(){
  this.memberService.updateMember(this.editForm?.value).subscribe({
    next:()=>{
      this.toastrService.success("Profile Updated")
      this.editForm?.reset(this.member);
    }
  });
 
}
loadMember(){
  const user = this.accountService.LoggedInUser();
  if(!user) return;
  this.memberService.getMember(user.username).subscribe({
    next:(response:Member)=>{
      this.member = response;
    },
    
  });
}
}
