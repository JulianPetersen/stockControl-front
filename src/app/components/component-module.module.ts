import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AgregarProductoModalComponent } from './agregar-producto-modal/agregar-producto-modal.component';

import { FormsModule } from '@angular/forms';
import { AgregarVentaComponent } from './agregar-venta/agregar-venta.component';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    AgregarProductoModalComponent,
    AgregarVentaComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    MenuComponent,
    HeaderComponent,
    AgregarProductoModalComponent, 
    AgregarVentaComponent


  ]
})
export class ComponentModuleModule { }
