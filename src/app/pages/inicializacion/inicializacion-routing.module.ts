import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicializacionPage } from './inicializacion.page';

const routes: Routes = [
  {
    path: '',
    component: InicializacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicializacionPageRoutingModule {}
