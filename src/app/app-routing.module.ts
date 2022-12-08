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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '',
   component: DefaultComponent,
   children: [
      { path: 'hdashboard',component: HdashboardComponent},
      { path: 'rdashboard',component: RdashboardComponent},
      { path: 'createclaim/:stagename',component:CreatclaimComponent},
      { path: 'viewclaim',component: ViewclaimComponent},
      { path: 'reset',component: ResetpasswordComponent},
      { path: 'profile',component: ProfileComponent},
      { path: 'slastatus',component: SlaStatusComponent},
    ]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
