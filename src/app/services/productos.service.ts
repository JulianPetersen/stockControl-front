import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }

  productArray:Products[]=[
    {productName:'Shampoo head & shoulders', price:1000, productImg:'/assets/shoulder.jpg', stock:50},
    {productName:'Shampoo Dove', price:1000, productImg:'/assets/dove.png', stock:35}
  ]
}
