import { Component, OnInit } from '@angular/core';
import { AgregarProductoModalComponent } from 'src/app/components/agregar-producto-modal/agregar-producto-modal.component';
import { Products } from 'src/app/models/products';
import { GlobalService } from 'src/app/services/global.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.page.html',
  styleUrls: ['./agregar-productos.page.scss'],
})
export class AgregarProductosPage implements OnInit {
  
  constructor(public global:GlobalService, public products:ProductosService) { }
  
  productsList:Products[] = this.products.productArray
  
  ngOnInit() {
  }


  presentModal(){
    this.global.presentModal(AgregarProductoModalComponent,'','')
  }

}
