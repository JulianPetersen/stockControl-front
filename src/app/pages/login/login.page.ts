import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginResponse, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public global:GlobalService, public auth:AuthService, public router:Router) { }

  ngOnInit() {
  }


  usuario:User = {
    username:"",
    email:"",
    password:"",
    roles:""
  };


  login(){
    if(this.validateInputs()){
      this.auth.login(this.usuario)
      .subscribe((res:loginResponse) => {
        console.log(res.firstTime)
        localStorage.setItem('token', res.token)
        localStorage.setItem('userId', res.userId)
        if(res.firstTime == false){
          this.router.navigate(['/home'])
        }else{
          this.router.navigate(['/inicializacion'])
        }
      },
      err=>{
        this.global.presentAlert("Error al intentar loguearse", err.error.message)
      })
    }
   
  }


  validateInputs(){
    // if(this.usuario.username == ""){
    //   this.global.presentAlert('Error al intentar registrarse', "nombre de usuario obligatorio")
    //   return false
    // }
    if(this.usuario.email ==""){
      this.global.presentAlert('Error al intentar loguearse', "campo email es obligatorio")
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
