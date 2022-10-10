import { Component, Input, OnInit } from '@angular/core';
import { TurnosCompletados } from 'src/app/models/turnos-completados';

@Component({
  selector: 'app-turnoscompletos-detalles',
  templateUrl: './turnoscompletos-detalles.component.html',
  styleUrls: ['./turnoscompletos-detalles.component.scss'],
})
export class TurnoscompletosDetallesComponent implements OnInit {

  @Input() id;
  @Input() nombreCliente;
  @Input() apellidoCliente;
  @Input() fechaTurno;
  @Input() horarioTurno
  @Input() realizadoPor
  @Input() userId;
  @Input() monto;
  @Input() observaciones;


  constructor() { }

  ngOnInit() {
    console.log(this.id)
    console.log(this.nombreCliente)
    console.log(this.fechaTurno)
    console.log(this.horarioTurno)
    console.log(this.realizadoPor)
    console.log(this.userId)
    console.log(this.monto)
    console.log(this.observaciones)
  }


 
}
