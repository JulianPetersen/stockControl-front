import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turnos } from '../models/turnos';
import { TurnosCompletados } from '../models/turnos-completados';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosCompletadosService {

  constructor(public http:HttpClient, public global:GlobalService) { }



  getTurnos(userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get<TurnosCompletados[]>(`${this.global.URL}/turnosCompleto/${userId}`, {headers:headers})
  }

  getTurnosByDate(userId:string, date:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get<TurnosCompletados[]>(`${this.global.URL}/turnosCompleto/getTurnobydate/${userId}/${date}`, {headers:headers})
  }

  createTurno(turno:TurnosCompletados){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    });
    return this.http.post(`${this.global.URL}/turnosCompleto`, turno, {headers:headers})
  }

  updateTurno(turno:TurnosCompletados, turnoId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    });
    return this.http.put(`${this.global.URL}/turnosCompleto/${turnoId}`, turno, {headers:headers})
  }

  deleteTurno(idTurno:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    });
    return this.http.delete(`${this.global.URL}/turnosCompleto/${idTurno}`, {headers:headers})
  }
}
