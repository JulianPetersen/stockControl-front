import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarProductosPageRoutingModule } from './agregar-productos-routing.module';

import { AgregarProductosPage } from './agregar-productos.page';
import { ComponentModuleModule } from 'src/app/components/component-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarProductosPageRoutingModule,
    ComponentModuleModule,
    ComponentModuleModule
  ],
  declarations: [AgregarProductosPage]
})
export class AgregarProductosPageModule {}
