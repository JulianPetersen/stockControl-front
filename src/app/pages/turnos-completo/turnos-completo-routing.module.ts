import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnosCompletoPage } from './turnos-completo.page';

const routes: Routes = [
  {
    path: '',
    component: TurnosCompletoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurnosCompletoPageRoutingModule {}
