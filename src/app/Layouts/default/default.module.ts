import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HdashboardComponent } from 'src/app/Pages/hdashboard/hdashboard.component';
import { RdashboardComponent } from 'src/app/Pages/rdashboard/rdashboard.component';
import { CreatclaimComponent } from 'src/app/Pages/creatclaim/creatclaim.component';
import { ViewclaimComponent } from 'src/app/Pages/viewclaim/viewclaim.component';
import { ResetpasswordComponent } from 'src/app/Pages/resetpassword/resetpassword.component';
import { ProfileComponent } from 'src/app/Pages/profile/profile.component';
import { FormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    DefaultComponent,
    HdashboardComponent,
    RdashboardComponent,
    CreatclaimComponent,
    ViewclaimComponent,
    ResetpasswordComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatButtonToggleModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DefaultModule { }
