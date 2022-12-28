import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule }   from '@angular/forms';
import { DefaultModule } from './Layouts/default/default.module';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiService } from './service/api.service';
import { SlaStatusComponent } from './Pages/sla-status/sla-status.component';
import { AuthenticationService } from './service/authentication.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalpopupService } from './Providers/modalpopup.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SlaStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DefaultModule,
    MatFormFieldModule,
    HttpClientModule,
    NgxSpinnerModule
        // MatDialogModule,
    // MatTableModule ,
    // CdkTableModule
    // MatTable
  
  ],
  // { provide: LocationStrategy, useClass: HashLocationStrategy}
  providers: [ApiService,AuthenticationService,ModalpopupService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

