import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient, public global:GlobalService, public router:Router) { }

  register(user:User){
    return this.http.post(`${this.global.URL}/auth/signup`, user)
  }

  login(user:User){
    return this.http.post(`${this.global.URL}/auth/signin`, user)
  }


  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    this.router.navigate(['/login'])
  }

  updateUser(userId:string, user){
   return this.http.put(`${this.global.URL}/auth/updateuser/${userId}`, user)
  }

getUserById(userId){
  return this.http.get(`${this.global.URL}/auth/getuser/${userId}`)
}
}
