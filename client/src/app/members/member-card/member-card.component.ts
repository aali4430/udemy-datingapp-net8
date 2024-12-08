import { Component, input, OnInit } from '@angular/core';
import { Member } from '../../_models/Member';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent implements OnInit {
memberFromList = input.required<Member>();
profileURL:string = ""

//public profileLink = "member/"+this.memberFromList().username;

ngOnInit(): void {
  this.profileURL="/members/"+this.memberFromList().username;
}

}
