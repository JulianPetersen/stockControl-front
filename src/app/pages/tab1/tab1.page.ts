import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarVentaComponent } from 'src/app/components/agregar-venta/agregar-venta.component';
import { CajaService } from 'src/app/services/caja.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Distintas pantallas del home
  diario:boolean = false;
  semanal:boolean = true;
  mensual:boolean = true;
  anual:boolean = true;


  //Formateo de la fecha
  day:Date = new Date;
  month:Date = new Date;
  formatedYear:string;
  formatedMoth:string;
  formatedDay:number;
  SelecteDate;

  //variable para seleccionar el año en el que estamos
  anioActual;

  //variable para cambiar color de fondo del ion card
  selectedDay:boolean = false;


constructor(public global:GlobalService,
            public modalController: ModalController,
            public caja:CajaService) {}

  
  ventas= this.caja.ventas;
  gastos = this.caja.gastos;

  ngOnInit(){
    let mes = this.month.getMonth()
    this.obtenerMesFormateado(mes); 
    this.obtenerDia();
    this.obtenerAño();
    
  }
  
//#region manipulacion de las pantallas de home
  mostrarContenidoDiario(){
    this.diario = false;
    this.semanal = true;
    this.mensual = true;
    this.anual = true;
    
  }
  
  mostrarContenidoSemanal(){
    this.diario = true;
    this.semanal = false;
    this.mensual = true;
    this.anual = true;
  }

  mostrarContenidoMensual(){
    this.diario = true;
    this.semanal = true;
    this.mensual = false;
    this.anual = true;
  }

  mostrarContenidoAnual(){
    this.diario = true;
    this.semanal = true;
    this.mensual = true;
    this.anual = false;
  }
//#endregion

//#region Formateo de la fecha
obtenerDia(){
  this.formatedDay = this.day.getDate();
}

obtenerAño(){
  this.anioActual = this.day.getFullYear();
}

  formatDateSelected(data){
    let fecha = data.split('-');
    this.formatedYear = fecha[0];
    this.formatedMoth = fecha[1].split('0');
    let mes = this.formatedMoth[1]
    this.obtenerMesFormateado(parseInt(mes)-1)
    let dia = fecha[2].split('T')
    this.formatedDay = dia[0];

  }

  obtenerMesFormateado(obtainedMonth){
    const mes = obtainedMonth
    switch(mes){
      case  0:
        this.formatedMoth = 'Enero'
        console.log(this.formatedMoth);
      break
      case 1: 
      this.formatedMoth = 'Febrero'
      console.log(this.formatedMoth);
      break
      case 2: 
      this.formatedMoth = 'Marzo'
      console.log(this.formatedMoth);
      break
      case 3: 
      this.formatedMoth = 'Abril'
      console.log(this.formatedMoth);
      break
      case 4:
        this.formatedMoth = 'Mayo'
        console.log(this.formatedMoth);
      break
      case 5:
        this.formatedMoth = 'Junio'
        console.log(this.formatedMoth);
      break
      case 6:
        this.formatedMoth = 'Julio'
        console.log(this.formatedMoth);
      break
      case 7:
        this.formatedMoth = 'Agosto'
        console.log(this.formatedMoth);
      break
      case 8:
        this.formatedMoth = 'Septiembre'
        console.log(this.formatedMoth);
      break
      case 9:
        this.formatedMoth = 'Octubre'
        console.log(this.formatedMoth);
      break
      case 10:
        this.formatedMoth = 'Noviembre'
        console.log(this.formatedMoth);
      break
      case 11:
        this.formatedMoth = 'Diciembre'
        console.log(this.formatedMoth);
      break

      default:
        console.log('no se encontro el mes')

    }
  }
//#endregion


mostrarInfoDia(){
  if(this.selectedDay == false){
    this.selectedDay = true;
  }else if(this.selectedDay == true){
    this.selectedDay = false;
  }
}

nuevaVenta(){
  this.global.presentModal(AgregarVentaComponent,'','')
}
}

