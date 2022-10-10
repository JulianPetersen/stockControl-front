import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalanceTurnosPage } from './balance-turnos.page';

const routes: Routes = [
  {
    path: '',
    component: BalanceTurnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalanceTurnosPageRoutingModule {}
