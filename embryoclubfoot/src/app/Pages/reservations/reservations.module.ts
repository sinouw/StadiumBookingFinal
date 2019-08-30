import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationTerrainComponent } from './reservation-terrain/reservation-terrain.component';



@NgModule({
  declarations: [ReservationsComponent, ReservationTerrainComponent],
  imports: [
    CommonModule
  ]
})
export class ReservationsModule { }
