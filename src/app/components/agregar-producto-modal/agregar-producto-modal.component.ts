import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-agregar-producto-modal',
  templateUrl: './agregar-producto-modal.component.html',
  styleUrls: ['./agregar-producto-modal.component.scss'],
})
export class AgregarProductoModalComponent implements OnInit {

  constructor(public global:GlobalService) { }

  ngOnInit() {}



  cerrarModal(){
    this.global.dismissModal();
  }
}
