import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from '../AdminPanel/Models/basurl.data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservsationService {
  idTerrain
  //Clicked by client Send in params
  StartReservation : Date
  reservationBody:any;
  //By Client
  startRes : Date
  //By Client
  endRes : Date
  constructor(private http : HttpClient) { }

  putIdTerrain(id : string){
    this.idTerrain=id
  }

  putStartDate(date){
    this.StartReservation = date
  }


  getReservations() : Observable<any>{
    return this.http.get<any>(baseurl+"/Reservations?$select=StartReservation,EndReservation,Duration&$filter=contains(status,'Confirmed')")
  }

  putEndStart(start , end){
    this.startRes=start
    this.endRes=end
  }

  getEndStart(){
    let Body = {
      start:this.startRes,
      end:this.endRes
    }
    return Body
  }


}
