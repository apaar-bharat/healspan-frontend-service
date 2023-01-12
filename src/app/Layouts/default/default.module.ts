import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { OthercostComponent } from 'src/app/Pages/creatclaim/othercost/othercost.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipe } from 'src/app/Shared/Pipes/filter.pipe';
import { SortDirective } from 'src/app/Shared/Directives/sort.directive';
import { OrderbyPipe } from 'src/app/Shared/Pipes/orderby.pipe';
import { AlphabetOnlyDirective } from 'src/app/Shared/Directives/alphabet-only.directive';


@NgModule({
  declarations: [
    DefaultComponent,
    HdashboardComponent,
    RdashboardComponent,
    CreatclaimComponent,
    ViewclaimComponent,
    ResetpasswordComponent,
    ProfileComponent,
    OthercostComponent,
    FilterPipe,
    OrderbyPipe,
    SortDirective,
    AlphabetOnlyDirective
    
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
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatTableModule ,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  
})
export class DefaultModule { }
