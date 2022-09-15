import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(public global:GlobalService, public http:HttpClient) { }


  getProducts(userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    const fd = new FormData();
    return this.http.get<Products[]>(`${this.global.URL}/products/${userId}`, {headers:headers})
  }


  postProduct(name:string, category:string, price, stock, image:File,userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    const fd = new FormData();

    fd.append('name', name),
    fd.append('category', category)
    fd.append('price', price)
    fd.append('stock', stock)
    fd.append('image', image)
    fd.append('userId', userId)
    return this.http.post(`${this.global.URL}/products`,fd,{headers:headers})
  }


  deleteProduct(productId){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.delete(`${this.global.URL}/products/${productId}`, {headers:headers})
  }


  editProduct(productId, product){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
 
    return this.http.put(`${this.global.URL}/products/${productId}`,product,{headers:headers})
  }

  getProductoVendido(userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
 
    return this.http.get(`${this.global.URL}/productosvendidos/${userId}`,{headers:headers})
  }

  getProductoVendidoByYear(year:string, userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
 
    return this.http.get(`${this.global.URL}/productosvendidos/${year}/${userId}`,{headers:headers})
  }
  
}
