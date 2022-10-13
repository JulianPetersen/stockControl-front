import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss'],
})
export class AddUsuarioComponent implements OnInit {

  constructor(public global:GlobalService,
              public auth:AuthService
              ) { }

  ngOnInit() {
    console.log(localStorage.getItem('userId'))
    this.getuserById()
  }

  nombreSalon:string;
  nombreUsuario:string;
  apellidoUsuario:string;

usuario:User = {
    nombre:"",
    apellido:"",
    username:"",
    email:"",
    password:"",
    nombreSalon:"",
    roles:"",
    isModerator:true,
    idAdmin:""
  };

  cerrarModal(){
    this.global.dismissModal()
  }

  getuserById(){ 
    this.auth.getUserById(JSON.parse(localStorage.getItem('infoUser')).id)
      .subscribe((res:User) => {
        this.nombreSalon = res.nombreSalon;
        this.nombreUsuario = res.nombre;
        this.apellidoUsuario = res.apellido;
        console.log(res)
      })
  }

  registerUser(){
    let usuario:User = {
      nombre:this.usuario.nombre,
      apellido:this.usuario.apellido,
      username:this.usuario.username,
      email:this.usuario.email,
      password:this.usuario.password,
      nombreSalon:this.nombreSalon,
      roles:this.usuario.roles,
      idAdmin:localStorage.getItem('userId'),
      isModerator:true
    };
    this.auth.registerSubUser(usuario)
      .subscribe(res => {
        console.log(res)
      })
      
  }
}
