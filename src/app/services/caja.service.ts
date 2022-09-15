import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { responseVenta, Ventas } from '../models/ventas';
import { Gastos } from '../models/gastos';
@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(public http:HttpClient, public global:GlobalService) { }



  agregarVenta(venta:Ventas){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.post(`${this.global.URL}/ventas`, venta, {headers:headers})
  }

  agregarGasto(gasto:Gastos){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.post(`${this.global.URL}/gastos`, gasto, {headers:headers})
  }

  obtenerVentas(userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get<responseVenta[]>(`${this.global.URL}/ventas/${userId}`, {headers:headers})
  }

  obtenerVentaByFecha(fecha:string, userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get(`${this.global.URL}/ventas/getByFecha/${fecha}/${userId}`, {headers:headers})
  }


  obtenerGastosByFecha(fecha:string,userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get(`${this.global.URL}/gastos/getByFecha/${fecha}/${userId}`, {headers:headers})
  }

  
  obtenerGastos(userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get<Gastos[]>(`${this.global.URL}/gastos/${userId}`, {headers:headers})
  }
  
  deleteVenta(id){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.delete(`${this.global.URL}/ventas/${id}`, {headers:headers})
  }

  deleteGasto(id){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.delete(`${this.global.URL}/gastos/${id}`, {headers:headers})
  }


  obtenerVentaByMonth(month:string, userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get(`${this.global.URL}/ventas/getByMonth/${month}/${userId}`, {headers:headers})
  }

  obtenerGastosByMonth(month:string, userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get(`${this.global.URL}/gastos/getByMonth/${month}/${userId}`, {headers:headers})
  }


  getVentasByYear(year:string, userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get(`${this.global.URL}/ventas/getByYear/${year}/${userId}`, {headers:headers})
  }

  getGastosByYear(year:string, userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get(`${this.global.URL}/gastos/getByYear/${year}/${userId}`, {headers:headers})
  }

}
