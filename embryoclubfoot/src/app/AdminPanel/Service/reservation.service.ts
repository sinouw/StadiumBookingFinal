import { Injectable } from '@angular/core';
import { baseurl } from '../Models/basurl.data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
reservations : any
clubs : any
  StartReservation: any;
  constructor(private http : HttpClient) { }

  getReservationInfo(){
   return this.http.get(baseurl+'/Reservations?$select=Client&$expand=Client($select=FullName)&$expand=terrain($select=Name,Type,Price,IdClub)&$select=status,StartRes,EndRes,resDay,IdReservation')
   }

   DeleteReservation(id){
      this.http.delete(baseurl+'/Reservations/'+id).subscribe(
        res=>{
          this.getReservationInfo()
        },err=>{
          console.log(err);
        })
    }


    getClubs(){
     return this.http.get(baseurl + '/Clubs?$select=Name,IdClub') 
    }


}
