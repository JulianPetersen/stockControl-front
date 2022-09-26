import { Component, Input, OnInit } from '@angular/core';
import { Turnos } from 'src/app/models/turnos';
import { GlobalService } from 'src/app/services/global.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-edit-turnos',
  templateUrl: './edit-turnos.component.html',
  styleUrls: ['./edit-turnos.component.scss'],
})
export class EditTurnosComponent implements OnInit {

  @Input() id;
  @Input() nombre;
  @Input() apellido;
  @Input() fecha;
  @Input() horario;
  @Input() userId

  constructor(private global:GlobalService,
              private turno:TurnosService) { }

  ngOnInit() {
    console.log(this.horario)
    console.log(this.fecha)
  }

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

    this.fecha = `${day}-${month}-${year}`
    this.horario = hora      
}


updateTurno(){
  let turno:Turnos = {
    nombreCliente: this.nombre,
    apellidoCliente:this.apellido,
    fechaTurno:this.fecha,
    horarioTurno:this.horario,
    userId:this.userId
  }

  this.turno.updateTurno(turno,this.id)
    .subscribe((res)=> {
      this.cerrarModal();
    })
  console.log(turno)
}
}
