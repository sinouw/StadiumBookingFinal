import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResCalendarComponent } from './res-calendar/res-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { ToastaModule} from 'ngx-toasta';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ResCalendarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ToastaModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class DemoCalendarModule { }
