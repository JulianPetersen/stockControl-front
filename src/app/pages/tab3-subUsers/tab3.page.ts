import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddUsuarioComponent } from 'src/app/components/add-usuario/add-usuario.component';
import { loginResponse, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { SubusersService } from 'src/app/services/subusers.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  listSubUser:loginResponse[];
  listSubUserEmpty:boolean = true
  nombreSalon:string;
  nombreUsuario:string
  apellidoUsuario:string

  constructor(public subUser:SubusersService, 
              public global:GlobalService, 
              public modalController:ModalController,
              public auth:AuthService) {}


  ngOnInit(){
    this.getSubUSers()
    this.getuserById()
  }

  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
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

getSubUSers(){
  this.subUser.getSubUsers(localStorage.getItem('userId'))
    .subscribe((res:loginResponse[]) => {
      this.listSubUser = res;
      console.log(this.listSubUser)
      if(this.listSubUser.length == 0){
        this.listSubUserEmpty = true
      }else{
        this.listSubUserEmpty = false
      }
    })
}

async agrearSubUsuario(){
  let modal = await this.modalController.create({
    component: AddUsuarioComponent,
  });
  modal.onDidDismiss().then((data) => {
    
  });
  modal.present();
}

desactivarUsuario(id){
  let user = {
    userActive:false
  }
  this.auth.updateUser(id,user)
    .subscribe(res => {
      console.log(res);
    })
}
}
