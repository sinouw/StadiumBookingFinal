import { Routes } from '@angular/router';
import { ResCalendarComponent } from "./res-calendar/res-calendar.component";


export const CalendarRoutes : Routes = [
	{ 
		path: '', 
		component: ResCalendarComponent 
	},
   { 
      path: '', 
      children: [
         {
               path: 'calendar',
               component: ResCalendarComponent
         },
         {
             path: 'calendar/:id',
             component: ResCalendarComponent
         },
      ]
   },

]