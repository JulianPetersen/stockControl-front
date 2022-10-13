import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AgregarProductoModalComponent } from './agregar-producto-modal/agregar-producto-modal.component';

import { FormsModule } from '@angular/forms';
import { AgregarVentaComponent } from './agregar-venta/agregar-venta.component';
import { AddCategoryProductComponent } from './add-category-product/add-category-product.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { SelectProductComponent } from './select-product/select-product.component';
import { AgregarGastosComponent } from './agregar-gastos/agregar-gastos.component';
import { AgregarTurnoComponent } from './agregar-turno/agregar-turno.component';
import { EditTurnosComponent } from './edit-turnos/edit-turnos.component';
import { AddEgresoTurnosComponent } from './add-egreso-turnos/add-egreso-turnos.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';




@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    AgregarProductoModalComponent,
    AgregarVentaComponent,
    AddCategoryProductComponent,
    ProducteditComponent,
    SelectProductComponent,
    AgregarGastosComponent,
    AgregarTurnoComponent,
    EditTurnosComponent,
    AddEgresoTurnosComponent,
    AddUsuarioComponent
    
   
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
    AgregarVentaComponent,
    AddCategoryProductComponent,
    ProducteditComponent,
    SelectProductComponent,
    AgregarGastosComponent,
    AgregarTurnoComponent,
    EditTurnosComponent,
    AddEgresoTurnosComponent,
    AddUsuarioComponent
    

  ]
})
export class ComponentModuleModule { }
