import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './error/test-errors/test-errors.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';

export const routes: Routes = [
{path:'', component: HomeComponent},
{path:'', runGuardsAndResolvers:'always', canActivate:[authGuard], // multi route auth guard
    children:[
        
        {path:'members/:username', component: MemberDetailComponent},
        {path:'lists', component: ListComponent},
        {path:'messages', component: MessagesComponent},
        
    ]
    
},
{path:'members', component: MemberListComponent, canActivate:[authGuard]}, // single route auth guard
{path:'errors', component: TestErrorsComponent}, // single route auth guard
{path:'not-found', component: NotFoundComponent}, // single route auth guard
{path:'server-error', component: ServerErrorComponent}, // single route auth guard

{path:'**', component: HomeComponent,pathMatch:'full'},


];
