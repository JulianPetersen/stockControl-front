import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenAnualPage } from './resumen-anual.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenAnualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenAnualPageRoutingModule {}
