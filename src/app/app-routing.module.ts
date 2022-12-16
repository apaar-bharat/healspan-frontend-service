import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './Layouts/default/default.component';
import { LoginComponent } from './login/login.component';
import { CreatclaimComponent } from './Pages/creatclaim/creatclaim.component';
import { HdashboardComponent } from './Pages/hdashboard/hdashboard.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RdashboardComponent } from './Pages/rdashboard/rdashboard.component';
import { ResetpasswordComponent } from './Pages/resetpassword/resetpassword.component';
import { SlaStatusComponent } from './Pages/sla-status/sla-status.component';
import { ViewclaimComponent } from './Pages/viewclaim/viewclaim.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '',
   component: DefaultComponent,
   children: [
    { path: 'hdashboard',component: HdashboardComponent,canActivate:[AuthGuard]},
    { path: 'rdashboard',component: RdashboardComponent,canActivate:[AuthGuard]},
    { path: 'createclaim/:stagename',component:CreatclaimComponent,canActivate:[AuthGuard]},
    { path: 'viewclaim',component: ViewclaimComponent,canActivate:[AuthGuard]},
    { path: 'reset',component: ResetpasswordComponent,canActivate:[AuthGuard]},
    { path: 'profile',component: ProfileComponent,canActivate:[AuthGuard]},
    { path: 'slastatus',component: SlaStatusComponent,canActivate:[AuthGuard]},
    ]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
