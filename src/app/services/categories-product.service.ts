import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { CategoriesProduct } from '../models/categories-product';

@Injectable({
  providedIn: 'root'
})
export class CategoriesProductService {

  constructor(private http:HttpClient, public global:GlobalService) { }


  getCategories(userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get<CategoriesProduct[]>(`${this.global.URL}/categoryProduct/${userId}`, {headers:headers})
  }

  createCategory(categories:CategoriesProduct){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    });
    return this.http.post(`${this.global.URL}/categoryProduct`, categories, {headers:headers})
  }

}
