import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor() { }



  ventas = [
    {concepto:'Shampoo pelo rizo', monto: 1000, metodoPago:'Efectivo',}
  ]

  gastos = [
    {concepto:'Almuerzo', monto:500, metodoPago:'Efectivo'}
  ]
  
}
