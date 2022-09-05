import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Products } from 'src/app/models/products';
import { Ventas } from 'src/app/models/ventas';
import { AgregarProductosPage } from 'src/app/pages/agregar-productos/agregar-productos.page';
import { CajaService } from 'src/app/services/caja.service';
import { GlobalService } from 'src/app/services/global.service';
import { SelectProductComponent } from '../select-product/select-product.component';

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.scss'],
})
export class AgregarVentaComponent implements OnInit {

  constructor(public global:GlobalService,
              public modalController:ModalController,
              public caja:CajaService) { }

  ngOnInit() {
    this.obtenerFechaFormateada()
  }

  productSelected:Products = {
    _id:"",
    name:"",
    category:"",
    price:null,
    stock:0
}
  monto:number;
  metodoPago:string
  fecha:Date = new Date
  fechaFormateada;
  monthFormated;
  yearFormated;

  newVenta:Ventas = {
    producto:"",
    monto:null,
    metodoPago:"",
    fecha:"",
    month:"",
    year:""

  }
  
  date:Date = new Date;
  cerrarModal(){
    this.global.dismissModal();
  }

  obtenerFechaFormateada(){
    let day = new Date()
    let dia = day.getDate().toString()
    let month = (day.getMonth()+1).toString()
    
    let year = day.getFullYear();
    if (dia.length == 1){
      dia = `0${dia}`
      
    }
    if(month.length == 1){
      month = `0${month}`
    }
    this.fechaFormateada = `${dia}-${month}-${year}`
    this.monthFormated = `${month}-${year}`
    this.yearFormated = `${year}`
    
  }


  agregarVenta(){
    let nuevaVenta:Ventas = {
      producto:this.productSelected._id,
      monto:this.productSelected.price,
      metodoPago:this.metodoPago,
      fecha:this.fechaFormateada,
      month:this.monthFormated,
      year:this.yearFormated
    }

    if(this.validateData()){
      this.caja.agregarVenta(nuevaVenta)
      .subscribe(res => {
       this.modalController.dismiss();
      })
    }
    
  }

  validateData(){
    if(this.productSelected.price == null){
      this.global.presentAlert('Faltan Datos', 'No olvide selecciona un producto')
      return false
    }else if(this.metodoPago == ""){
      this.global.presentAlert('Faltan datos', 'Seleccione un metodo de pago')
      return false
    }
    return true
  }
  async SelectProduct(){
     const modal = await this.modalController.create({
        component:SelectProductComponent,

     });
     modal.onDidDismiss().then(data => {
       this.productSelected = data.data.prod
       this.newVenta.producto = data.data.prod._id
      
     })

     return await modal.present();
  }
}
