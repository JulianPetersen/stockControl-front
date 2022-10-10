import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EgresoTurno } from 'src/app/models/egreso-turno';
import { EgresoTurnosService } from 'src/app/services/egreso-turnos.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-egreso-turnos',
  templateUrl: './add-egreso-turnos.component.html',
  styleUrls: ['./add-egreso-turnos.component.scss'],
})
export class AddEgresoTurnosComponent implements OnInit {

  constructor(public global:GlobalService,
              public modalController:ModalController,
              public egresoTurno:EgresoTurnosService) { }

  ngOnInit() {
    this.obtenerFechaFormateada()
  }

  newGasto:EgresoTurno = {
    fechaEgreso:"",
    userId: "",
    monto:0,
    concepto:"",
    month:"",
    year:"",
    metodoPago:""
  }
  
  fechaFormateada;
  monthFormated
  yearFormated;

  cerrarModal(){
    this.global.dismissModal()
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
    let gasto:EgresoTurno = {
      fechaEgreso:this.fechaFormateada,
      userId:localStorage.getItem('userId'),
      monto:this.newGasto.monto,
      concepto:this.newGasto.concepto,
      month:this.monthFormated,
      year:this.yearFormated,
      metodoPago:this.newGasto.metodoPago,
      
    }
    if(this.validateData()){
      this.egresoTurno.createGasto(gasto)
      .subscribe(res => {
       console.log(res)
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

  obtenerFecha(data){
    let fechaSelect = data.split('-')
    let year = fechaSelect[0];
    let mont = fechaSelect[1];
    let daySelected = fechaSelect[2].split('T')
    let day = daySelected[0]
    console.log(`${year}-${mont}-${day}`)

    this.fechaFormateada = `${day}-${mont}-${year}`
    this.monthFormated = `${mont}-${year}`
    this.yearFormated = `${year}`
   
  }
}
