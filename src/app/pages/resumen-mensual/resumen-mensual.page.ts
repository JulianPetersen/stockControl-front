import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Gastos } from 'src/app/models/gastos';
import { responseVenta } from 'src/app/models/ventas';
import { CajaService } from 'src/app/services/caja.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-resumen-mensual',
  templateUrl: './resumen-mensual.page.html',
  styleUrls: ['./resumen-mensual.page.scss'],
})
export class ResumenMensualPage implements OnInit {

  constructor(public router:Router, 
              public caja:CajaService,
              public global:GlobalService,
              private loadingCtrl: LoadingController) { }
  
  selectedMonth;
  selectedMonthByGastos;
  formatedMoth;
  selectedDate;

  day=new Date();
  
  formatedDay;
  formatedYear;
  anioActual;


  month:Date = new Date()
  listVentas: responseVenta[] = [];
  listGastos:Gastos[]=[];
  totalIngresos: number;
  totalGastos:number


  ngOnInit() {
   let mes = this.month.getMonth()
   this.obtenerMesFormateado(mes);
   this.obtenerVentasPorMes(this.selectedMonth);
   this.obtenerGastosPorMes(this.selectedMonthByGastos)
   
  }

  
  obtenerAño() {
    this.anioActual = this.day.getFullYear();
  }


  mostrarContenidoDiario() {
    this.router.navigateByUrl('/home')
   }
 
   mostrarContenidoMensual() {
     this.router.navigateByUrl('/resumen-mensual')
   }
 
   mostrarContenidoAnual() {
    this.router.navigateByUrl('/resumen-anual')
   }



   formatDateSelectedByMoment(data){
    let fecha = data.split('-');
    this.formatedYear = fecha[0];
    this.formatedMoth = fecha[1].split('0');
    let mes = this.formatedMoth[1];
    this.obtenerMesFormateado(parseInt(mes) - 1);
    let dia = fecha[2].split('T');
    this.formatedDay = dia[0];
   }

 

   obtenerMesFormateado(obtainedMonth) {
    const mes = obtainedMonth;
    switch (mes) {
      case 0:
        this.formatedMoth = 'Enero';
        break;
      case 1:
        this.formatedMoth = 'Febrero';
        break;
      case 2:
        this.formatedMoth = 'Marzo';
        break;
      case 3:
        this.formatedMoth = 'Abril';
        break;
      case 4:
        this.formatedMoth = 'Mayo';
        break;
      case 5:
        this.formatedMoth = 'Junio';
        break;
      case 6:
        this.formatedMoth = 'Julio';
        break;
      case 7:
        this.formatedMoth = 'Agosto';
        break;
      case 8:
        this.formatedMoth = 'Septiembre';
        break;
      case 9:
        this.formatedMoth = 'Octubre';
        break;
      case 10:
        this.formatedMoth = 'Noviembre';

        break;
      case 11:
        this.formatedMoth = 'Diciembre';

        break;
      default:
    }
  }


  obtenerGastosPorMes(mes:string){
    let day = new Date();
    let dia = day.getDate().toString();
    let month = (day.getMonth() + 1).toString();
    let year = day.getFullYear();
    if (dia.length == 1) {
      dia = `0${dia}`;
    }
    if (month.length == 1) {
      month = `0${month}`;
    }
    this.selectedMonth = `${month}-${year}`;
    this.formatearFechaObtainedGastos(mes);

    this.caja
      .obtenerGastosByMonth(this.selectedMonth)
      .subscribe((res: Gastos[]) => {
        this.listGastos = res;
        this.totalGastos = this.listGastos
          .map((item) => item.monto)
          .reduce((prev, curr) => prev + curr, 0);
          console.log(this.listGastos)
      });
  }


  obtenerVentasPorMes(mes:string){
    let day = new Date();
    let dia = day.getDate().toString();
    let month = (day.getMonth() + 1).toString();
    let year = day.getFullYear();
    if (dia.length == 1) {
      dia = `0${dia}`;
    }
    if (month.length == 1) {
      month = `0${month}`;
    }
    this.selectedMonth = `${month}-${year}`;
    this.formatearFechaObtainedVentas(mes);
    this.global.showLoading('cargando')
    this.caja
      .obtenerVentaByMonth(this.selectedMonth)
      .subscribe((res: responseVenta[]) => {
        setTimeout(() => {
          this.loadingCtrl.dismiss();
        }, 500);
        this.listVentas = res;
        this.totalIngresos = this.listVentas
          .map((item) => item.monto)
          .reduce((prev, curr) => prev + curr, 0);
          console.log(this.listVentas)
      });
  }

  formatearFechaObtainedVentas(fechaSeleccionada) {
    if (fechaSeleccionada != undefined) {
      let fecha = fechaSeleccionada.split('-');
      let year = fecha[0];
      let month = fecha[1].split();
      this.selectedMonth = `${month}-${year}`;
    }
  }
  

  formatearFechaObtainedGastos(fechaSeleccionada) {
    if (fechaSeleccionada != undefined) {
      let fecha = fechaSeleccionada.split('-');
      let year = fecha[0];
      let month = fecha[1].split();
      this.selectedMonth = `${month}-${year}`;
    }
  }

}
