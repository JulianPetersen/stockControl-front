import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.scss'],
})
export class AgregarVentaComponent implements OnInit {

  constructor(public global:GlobalService) { }

  ngOnInit() {}


  cerrarModal(){
    this.global.dismissModal();
  }
}
