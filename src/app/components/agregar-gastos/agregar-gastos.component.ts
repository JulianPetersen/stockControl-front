import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Gastos } from 'src/app/models/gastos';
import { Products } from 'src/app/models/products';
import { Ventas } from 'src/app/models/ventas';
import { CajaService } from 'src/app/services/caja.service';
import { GlobalService } from 'src/app/services/global.service';
import { SelectProductComponent } from '../select-product/select-product.component';

@Component({
  selector: 'app-agregar-gastos',
  templateUrl: './agregar-gastos.component.html',
  styleUrls: ['./agregar-gastos.component.scss'],
})
export class AgregarGastosComponent implements OnInit {
  constructor(
    public global: GlobalService,
    public modalController: ModalController,
    public caja: CajaService,

  ) {}

  ngOnInit() {
    this.obtenerFechaFormateada()
  }

date:Date = new Date;

newGasto:Gastos = {
  concepto:"",
  monto:null,
  metodoPago:"",
  fecha:"",
  month:"",
  year:""
}

fechaFormateada;
monthFormated
yearFormated;

  cerrarModal() {
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
 
  AgregarGasto(){
   let gasto:Gastos = {
      concepto:this.newGasto.concepto,
      monto:this.newGasto.monto,
      metodoPago:this.newGasto.metodoPago,
      fecha:this.fechaFormateada,
      month:this.monthFormated,
      year:this.yearFormated
    }
    if(this.validateData()){
      this.caja.agregarGasto(gasto)
      .subscribe(res => {
       
        this.modalController.dismiss();
      })
    }
  }

  validateData(){
    if(this.newGasto.concepto == ""){
      this.global.presentAlert('Faltan Datos', 'No olvide Agregar un concepto')
      return false;
    }else if(this.newGasto.monto == null){
      this.global.presentAlert('Faltan datos', 'No olvide Agregar un monto del gasto')
      return false
    }else if(this.newGasto.metodoPago == ''){
      this.global.presentAlert('Faltan datos', 'Seleccione un metodo de pago')
      return false
    }
    return true;
  }
}

  

