import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DatePipe } from './Pipes/date.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DatePipe,
    //SortPipe,
    //OrderbyPipe,
    // FilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    
  ]
})
export class SharedModule { }
