import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginResponse, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario:User = {
    username:"",
    email:"",
    password:"",
    roles:""
  };
  
  constructor(public auth:AuthService,
              public global:GlobalService,
              public router:Router) { }

  ngOnInit() {
  }

  registerUser(){
 
    if(this.validateInputs()){
      this.auth.register(this.usuario)
      .subscribe((res:loginResponse) => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/login'])
      },
      err=>{
        this.global.presentAlert("Error al intentar loguearse", err.error.message)
      })
    }
   
  }

  validateInputs(){
    if(this.usuario.username == ""){
      this.global.presentAlert('Error al intentar registrarse', "nombre de usuario obligatorio")
      return false
    }else if(this.usuario.email ==""){
      this.global.presentAlert('Error al intentar registrarse', "campo email es obligatorio")
      return false
    // }else if(this.global.validateFormatEmail){
    //   this.global.presentAlert('error al intentar registrarse', 'el formato de Email es incorrecto')
    //   return false
    }else if(this.usuario.password ==""){
      this.global.presentAlert('Error al intentar registrarse', "campo contraseña es obligatorio")
      return false
    }
    return true;
  }
}
