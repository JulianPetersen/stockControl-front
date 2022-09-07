import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { Gastos } from 'src/app/models/gastos';
import { Products } from 'src/app/models/products';
import { Ventas } from 'src/app/models/ventas';
import { CajaService } from 'src/app/services/caja.service';
import { GlobalService } from 'src/app/services/global.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-resumen-anual',
  templateUrl: './resumen-anual.page.html',
  styleUrls: ['./resumen-anual.page.scss'],
})
export class ResumenAnualPage implements OnInit {

  formatedYear;
  formatedMoth;
  formatedDay;
  month:Date = new Date()


  listVentas:Ventas[];
  listGastos:Gastos[];
  totalGastos;
  totalVentas;
  totalProductsoVendidos;

  listaProductsoVendidos;

  constructor(public router:Router,
              public caja:CajaService,
              private loadingCtrl: LoadingController,
              public global:GlobalService,
              public productos:ProductosService) { }

  ngOnInit() {
    let year = this.month.getFullYear()
    this.formatedYear = year
    this.getVentasByYear();
    this.getGastosByYear();
    this.getProductosVendidos();
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
    let dia = fecha[2].split('T');
    this.formatedDay = dia[0];
    this.getProductosVendidos()
   }

   
  getVentasByYear(){
    
    this.caja.getVentasByYear(this.formatedYear)
      .subscribe( (res:Ventas[]) => {
        this.listVentas = res;
        this.totalVentas = this.listVentas
        .map((item) => item.monto)
        .reduce((prev, curr) => prev + curr, 0);
        })
  }

  async getGastosByYear(){
    
    this.caja.getGastosByYear(this.formatedYear)
      .subscribe((res:Gastos[]) => {
        this.listGastos = res
        this.totalGastos = this.listGastos
        .map((item) => item.monto)
        .reduce((prev, curr) => prev + curr, 0);
        
      })
  }

  getProductosVendidos(){
    this.productos.getProductoVendidoByYear(this.formatedYear)
      .subscribe(res => {
        this.totalProductsoVendidos = res;
        console.log(this.totalProductsoVendidos);
      })
  }
}
