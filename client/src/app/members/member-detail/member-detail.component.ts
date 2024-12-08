import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '../../_services/member.service';
import { Member } from '../../_models/Member';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryComponent,GalleryItem } from '@daelmaak/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule,GalleryComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  
})
export class MemberDetailComponent implements OnInit  {
  memberService =  inject(MemberService);
  currentRoute = inject(ActivatedRoute);
  selectedUsername: string  = "DummyUser";
  toastr =  inject(ToastrService);
  member:Member|null=null;

  // gallery items
  images: GalleryItem[] = [{ src: 'kitten1.jpg' }]

  
  ngOnInit(): void {
    
    this.selectedUsername = String(this.currentRoute.snapshot.paramMap.get("username"));

    

    this.images = [
      {
        thumbSrc: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/1-small.jpeg',
        src: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/1-big.jpeg'
      },
      {
        thumbSrc: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-small.jpeg',
        
        src: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-big.jpeg'
      },
      {
        thumbSrc: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-small.jpeg',
        
        src: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-big.jpeg'
      },
      {
        thumbSrc: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-small.jpeg',
        
        src: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-big.jpeg'
      },
      {
        thumbSrc: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-small.jpeg',
        
        src: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-big.jpeg'
      }      
    ];

    this.getMember();
  }
  getMember(){
    this.memberService.getMember(this.selectedUsername).subscribe({
      next:(member:Member)=> {this.member = member;}
      ,error:(error)=>{this.toastr.error(error)}
    });
  }
}
