import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
{path:'', component: HomeComponent},
{path:'', runGuardsAndResolvers:'always', canActivate:[authGuard], // multi route auth guard
    children:[
        
        {path:'members/:id', component: MemberDetailComponent},
        {path:'lists', component: ListComponent},
        {path:'messages', component: MessagesComponent},
        
    ]
    
},
{path:'members', component: MemberListComponent, canActivate:[authGuard]}, // single route auth guard
{path:'**', component: HomeComponent,pathMatch:'full'},


];
