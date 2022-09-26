import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Turnos } from '../models/turnos';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(public http:HttpClient, public global:GlobalService) { }


  getTurnos(userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get<Turnos[]>(`${this.global.URL}/turnos/${userId}`, {headers:headers})
  }

  getTurnosByDate(userId:string, date:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get<Turnos[]>(`${this.global.URL}/turnos/getfechabydate/${userId}/${date}`, {headers:headers})
  }

  createTurno(turno:Turnos){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    });
    return this.http.post(`${this.global.URL}/turnos`, turno, {headers:headers})
  }

  updateTurno(turno:Turnos, turnoId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    });
    return this.http.put(`${this.global.URL}/turnos/${turnoId}`, turno, {headers:headers})
  }

  deleteTurno(idTurno:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    });
    return this.http.delete(`${this.global.URL}/turnos/${idTurno}`, {headers:headers})
  }
}
