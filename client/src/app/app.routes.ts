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
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
{path:'', component: HomeComponent},
{path:'', runGuardsAndResolvers:'always', canActivate:[authGuard], // multi route auth guard
    children:[
        
        {path:'members', component: MemberListComponent}, // single route auth guard
        {path:'members/:username', component: MemberDetailComponent},
        {path:'member/edit', component: MemberEditComponent, canDeactivate:[preventUnsavedChangesGuard]},
        {path:'lists', component: ListComponent},
        {path:'messages', component: MessagesComponent},
        
    ]
    
},

{path:'errors', component: TestErrorsComponent}, // single route auth guard
{path:'not-found', component: NotFoundComponent}, // single route auth guard
{path:'server-error', component: ServerErrorComponent}, // single route auth guard

{path:'**', component: HomeComponent,pathMatch:'full'},


];
