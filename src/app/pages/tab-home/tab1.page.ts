import { Component, ViewChild } from '@angular/core';
import { IonDatetime, LoadingController, ModalController } from '@ionic/angular';
import { AgregarGastosComponent } from 'src/app/components/agregar-gastos/agregar-gastos.component';
import { AgregarVentaComponent } from 'src/app/components/agregar-venta/agregar-venta.component';
import { responseVenta, Ventas } from 'src/app/models/ventas';
import { Gastos } from 'src/app/models/gastos';
import { CajaService } from 'src/app/services/caja.service';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  //Formateo de la fecha
  day: Date = new Date();
  month: Date = new Date();
  formatedYear: string;
  formatedMoth: string;
  formatedDay: number;
  //variable para seleccionar el año en el que estamos
  anioActual;
  //variable para cambiar color de fondo del ion card
  selectedDay: boolean = false;

  listVentas: responseVenta[] = [];
  listgastos: Gastos[] = [];
  fechasVenta: any[] = [];
  today: Date = new Date();
  fechaSeleccionada;
  fechaSeleccionadaGastos;

  totalIngresos: number;
  totalGastos: number;

  constructor(
    public global: GlobalService,
    public modalController: ModalController,
    public caja: CajaService,
    public router:Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    let mes = this.month.getMonth();
    this.obtenerMesFormateado(mes);
    this.obtenerDia();
    this.obtenerAño();
    this.getVentasByDate(this.fechaSeleccionada);
    this.getGastosByDate(this.fechaSeleccionadaGastos);
  }

  //#region manipulacion de las pantallas de home
  mostrarContenidoDiario() {
   this.router.navigateByUrl('/home')
  }

  mostrarContenidoMensual() {
    this.router.navigateByUrl('/resumen-mensual')
  }

  mostrarContenidoAnual() {
    this.router.navigateByUrl('/resumen-anual')
   }
  //#endregion

  //#region Formateo de la fecha
  obtenerDia() {
    this.formatedDay = this.day.getDate();
  }

  obtenerAño() {
    this.anioActual = this.day.getFullYear();
  }


  formatDateSelectedByMoment(data) {
   
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
  //#endregion

  mostrarInfoDia() {
    if (this.selectedDay == false) {
      this.selectedDay = true;
    } else if (this.selectedDay == true) {
      this.selectedDay = false;
    }
  }

  getVentasByDate(fechaSeleccionada) {
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
    this.fechaSeleccionada = `${dia}-${month}-${year}`;
    
    this.formatearFechaObtainedVentas(fechaSeleccionada);
    this.global.showLoading('cargando')
    this.caja
      .obtenerVentaByFecha(this.fechaSeleccionada,localStorage.getItem('userId'))
      .subscribe((res: responseVenta[]) => {
        setTimeout(() => {
          this.loadingCtrl.dismiss();
        }, 1000);
        this.listVentas = res;
        this.totalIngresos = this.listVentas
          .map((item) => item.monto)
          .reduce((prev, curr) => prev + curr, 0);
      });
  }

  getGastosByDate(fechaSeleccionada) {
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
    this.fechaSeleccionadaGastos = `${dia}-${month}-${year}`;
    this.formatearFechaObtainedGastos(fechaSeleccionada);
    this.caja
      .obtenerGastosByFecha(this.fechaSeleccionadaGastos,localStorage.getItem('userId'))
      .subscribe((res: Gastos[]) => {
        this.listgastos = res;
        this.totalGastos = this.listgastos
          .map((item) => item.monto)
          .reduce((prev, curr) => prev + curr, 0);
      });
  }

  formatearFechaObtainedVentas(fechaSeleccionada) {
    if (fechaSeleccionada != undefined) {
      let fecha = fechaSeleccionada.split('-');
      let year = fecha[0];
      let month = fecha[1].split();
      let obtainedDia = fecha[2].split('T');
      let dia = obtainedDia[0];
      this.fechaSeleccionada = `${dia}-${month}-${year}`;
    }
  }

  formatearFechaObtainedGastos(fechaSeleccionada) {
    if (fechaSeleccionada != undefined) {
      let fecha = fechaSeleccionada.split('-');
      let year = fecha[0];
      let month = fecha[1].split();
      let obtainedDia = fecha[2].split('T');
      let dia = obtainedDia[0];
      this.fechaSeleccionadaGastos = `${dia}-${month}-${year}`;
    }
  }

  async nuevaVenta() {
    let modal = await this.modalController.create({
      component: AgregarVentaComponent,
    });
    modal.onDidDismiss().then((data) => {
      this.caja
        .obtenerGastosByFecha(this.fechaSeleccionadaGastos,localStorage.getItem('userId'))
        .subscribe((res: Gastos[]) => {
          this.listgastos = res;
          this.totalGastos = this.listgastos
            .map((item) => item.monto)
            .reduce((prev, curr) => prev + curr, 0);
        });
      this.caja
        .obtenerVentaByFecha(this.fechaSeleccionada, localStorage.getItem('userId'))
        .subscribe((res: responseVenta[]) => {
          console.log(this.fechaSeleccionada);
          this.listVentas = res;
          this.totalIngresos = this.listVentas
            .map((item) => item.monto)
            .reduce((prev, curr) => prev + curr, 0);
        });
    });
    modal.present();
  }

  async nuevoGasto() {
    let modal = await this.modalController.create({
      component: AgregarGastosComponent,
    });
    modal.onDidDismiss().then((data) => {
      this.caja
        .obtenerGastosByFecha(this.fechaSeleccionadaGastos,localStorage.getItem('userId'))
        .subscribe((res: Gastos[]) => {
          this.listgastos = res;
          this.totalGastos = this.listgastos
            .map((item) => item.monto)
            .reduce((prev, curr) => prev + curr, 0);
        });
      this.caja
        .obtenerVentaByFecha(this.fechaSeleccionada, localStorage.getItem('userId'))
        .subscribe((res: responseVenta[]) => {
          console.log(this.fechaSeleccionada);
          this.listVentas = res;
          this.totalIngresos = this.listVentas
            .map((item) => item.monto)
            .reduce((prev, curr) => prev + curr, 0);
        });
    });
    modal.present();
  }

  deleteVenta(idVenta){
    console.log(idVenta)
    this.caja.deleteVenta(idVenta)
      .subscribe(res => {
        this.caja
        .obtenerVentaByFecha(this.fechaSeleccionada, localStorage.getItem('userId'))
        .subscribe((res: responseVenta[]) => {
          console.log(this.fechaSeleccionada);
          this.listVentas = res;
          this.totalIngresos = this.listVentas
            .map((item) => item.monto)
            .reduce((prev, curr) => prev + curr, 0);
        });
        
      })
  }

  deleteGasto(idGasto){
    this.caja.deleteGasto(idGasto)
      .subscribe(res => {
        this.caja
        .obtenerGastosByFecha(this.fechaSeleccionadaGastos,localStorage.getItem('userId'))
        .subscribe((res: Gastos[]) => {
          this.listgastos = res;
          this.totalGastos = this.listgastos
            .map((item) => item.monto)
            .reduce((prev, curr) => prev + curr, 0);
        });
      })
    
  }
}
