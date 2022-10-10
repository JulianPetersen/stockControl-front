import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/models/turnos';
import { GlobalService } from 'src/app/services/global.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-agregar-turno',
  templateUrl: './agregar-turno.component.html',
  styleUrls: ['./agregar-turno.component.scss'],
})
export class AgregarTurnoComponent implements OnInit {


  newTurno:Turnos = {
    nombreCliente:"",
    apellidoCliente:"",
    fechaTurno:"",
    horarioTurno:"",
    realizadoPor:"",
    userId:localStorage.getItem('userId')
  };

  constructor(private global:GlobalService, public turno:TurnosService) { }

  ngOnInit() {}


  cerrarModal() {
    this.global.dismissModal();
  }

  seleccionarFecha(fecha:string){
      let fechaSelected = fecha.split('-');
      let month = fechaSelected[1]
      let year = fechaSelected[0]
      let daySelected = fechaSelected[2].split('T')
      let day = daySelected[0]
      let horaSelected = daySelected[1]
      let horaDivided = horaSelected.split(':')
      let hora = `${horaDivided[0]}:${horaDivided[1]}`
      console.log(hora)

      if(day.length == 1){
        day = `0${day}`
      }
      if(month.length == 1){
        month = `0${month}`
      }

      this.newTurno.fechaTurno = `${day}-${month}-${year}`
      this.newTurno.horarioTurno = hora      
  }

  createTurno(){
    if(this.validatData()){
      this.turno.createTurno(this.newTurno)
      .subscribe((res)=>{
        this.cerrarModal();
      } )
    }
  }

  validatData(){
    if(this.newTurno.nombreCliente == ""){
      this.global.presentAlert('Error', 'debes ingresar un nombre de Cliente')
      return false
    }else if (this.newTurno.apellidoCliente == ""){
      this.global.presentAlert('Error', 'debes agregar un apellido para tu cliente.')
      return false
    }else if(this.newTurno.fechaTurno == ""){
        this.global.presentAlert('Error', 'Agrega una fecha')
        return false
    }
    return true;
  }
}
