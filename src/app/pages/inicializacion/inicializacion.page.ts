import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-inicializacion',
  templateUrl: './inicializacion.page.html',
  styleUrls: ['./inicializacion.page.scss'],
})
export class InicializacionPage implements OnInit {

  slideUno:boolean = true;
  slideDos:boolean= false;
  slideTres:boolean = false;
  nombreSalon:string = "";
  user={
    nombreSalon:this.nombreSalon,
    firstTime:true
  }



  constructor(public auth:AuthService, public router:Router, public global:GlobalService) { }

  ngOnInit() {
  }

  gotToStepTwo(){
    this.slideUno = false;
    this.slideDos = true;
    this.slideTres = false
  }

  gotToStepThree(){
    this.slideUno = false;
    this.slideDos = false;
    this.slideTres = true;
  }

  saveSalonName(){
    const user ={
      nombreSalon:this.nombreSalon,
      firstTime:false
    }
    this.auth.updateUser(localStorage.getItem('userId'), user)
        .subscribe(res => { 
          this.router.navigateByUrl('/tabs/tab1')
        })
  }
}
