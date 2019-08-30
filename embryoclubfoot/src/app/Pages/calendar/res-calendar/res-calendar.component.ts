import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  addHours,
  startOfMonth,
  subWeeks,
  addWeeks,
  endOfMonth
} from 'date-fns';
import { Subject, Observable } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarUtils,
  CalendarMonthViewDay,
  CalendarDateFormatter,
  DateFormatterParams
} from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { baseurl } from 'src/app/AdminPanel/Models/basurl.data';
import { EmbryoService } from 'src/app/Services/Embryo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { ReservsationService } from 'src/app/Services/reservsation.service';
import { timeout } from 'q';
import { ToastOptions, ToastaService } from 'ngx-toasta';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class

  public dayViewHour({date, locale}: DateFormatterParams): string {
    // change this to return a different date format
    return new Intl.DateTimeFormat(locale, {hour: 'numeric'}).format(date);
  }
}

@Component({
  selector: 'app-res-calendar',
  templateUrl: './res-calendar.component.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ],
  styleUrls: ['./res-calendar.component.css']
})
export class ResCalendarComponent implements OnInit {

  popUpNewResResponse
  
  IdTerrain: any

  reservations: any[] = []

  clickedDate: Date;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  toastOption  : ToastOptions = {
    title     : "Date Selection",
    msg       : "This Date has been Passed!",
    showClose : true,
    timeout   : 2000,
    theme     : "material"
 };

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public embryoService: EmbryoService,
    public service: AdminGenericService,
    private resservice: ReservsationService,
    public cdr: ChangeDetectorRef,
    private toastyService: ToastaService,
    private accountservice : AccountService) {


    this.IdTerrain = this.resservice.idTerrain
    console.log(this.IdTerrain)

    if (this.IdTerrain == null || this.IdTerrain == undefined)
      this.router.navigateByUrl('/client/terrains');

    this.getReservations()
      .subscribe(
        res => {
          this.reservations = res
          this.reservations.forEach(e => {
            if(e.status=="Confirmed")
            this.addDbEvents(new Date(e.StartReservation), new Date(e.EndReservation))
          });
        },
        err => console.log(err))
  }

  ngOnInit() {


  }

  events: CalendarEvent[] = [];

  getReservations(): Observable<any> {
    return this.http.get<any>(baseurl + "/Reservations?$select=StartReservation,EndReservation,status&$select=IdTerrain&$filter=IdTerrain eq "+this.IdTerrain)
  }

  dayClicked({ date }: { date: Date }): void {
    this.clickedDate = date
    let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

    if (this.view === CalendarView.Month && today <= date) {
      this.viewDate = date;
      this.view = CalendarView.Week;
    }else{
      this.toastyService.error(this.toastOption);
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }



  addDbEvents(startRes, endRes): void {

    this.events = [
      ...this.events,
      {
        title: 'Booked',
        start: startRes,
        end: endRes,
        color: colors.red,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false
        }
      }
    ];
  }

  RefrechEvents(): void {
    this.events = [
      ...this.events
    ];
  }

  AddReservationPopup() {
    this.embryoService.addNewReservationDialog(this.IdTerrain);
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  HourClicked({ date }: { date: Date }) {

    let today = new Date()
    if (this.view === CalendarView.Week && today <= date) {
      this.resservice.putStartDate(date)
      this.embryoService.addNewReservationDialog(this.IdTerrain)
        .subscribe(res => {
          this.popUpNewResResponse = res;
        },
          err => {
            console.log(err)
          },
          () => this.getAddResPopupResponse(this.popUpNewResResponse))
    }else{
      this.toastyService.error(this.toastOption);
    }
  }


  getAddResPopupResponse(response: any) {
    if (response) {
      this.getReservations()
      .subscribe(
        res => {
          this.events = []
          this.reservations = res
          this.reservations.forEach(e => {
            this.addDbEvents(new Date(e.StartReservation), new Date(e.EndReservation))
          });
        },
        err => console.log(err))
    }
  }
}
