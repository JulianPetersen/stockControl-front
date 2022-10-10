import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { EgresoTurno } from '../models/egreso-turno';

@Injectable({
  providedIn: 'root'
})
export class EgresoTurnosService {

  constructor(public http:HttpClient,
            public global:GlobalService) { }


  createGasto(egreso:EgresoTurno){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.post(`${this.global.URL}/egresoTurno`, egreso, {headers:headers})
  }

  getGastoByDate(fecha:string, userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get(`${this.global.URL}/egresoTurno/getEgresobydate/${userId}/${fecha}`, {headers:headers})
  }

  deleteEgresoturno(Id){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.delete(`${this.global.URL}/egresoTurno/${Id}`, {headers:headers})
  }

  
}

