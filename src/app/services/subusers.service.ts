import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
@Injectable({
  providedIn: 'root'
})
export class SubusersService {

  constructor(public http:HttpClient, public global:GlobalService) { }



  getSubUsers(userId:string){
    let headers = new HttpHeaders({
      "x-access-token": localStorage.getItem('token')
    })
    return this.http.get(`${this.global.URL}/users/subuser/${userId}`, {headers:headers})
  }
}
