import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab-home/tab1.module').then(m => m.Tab1PageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2-turnos/tab2.module').then(m => m.Tab2PageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3-subUsers/tab3.module').then(m => m.Tab3PageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'turnos-completo',
        loadChildren: () => import('../turnos-completo/turnos-completo.module').then( m => m.TurnosCompletoPageModule)
      },

      {
        path: 'balance-turnos',
        loadChildren: () => import('../balance-turnos/balance-turnos.module').then( m => m.BalanceTurnosPageModule)
      },
      {
        path: 'resumen-mensual',
        loadChildren: () => import('../resumen-mensual/resumen-mensual.module').then( m => m.ResumenMensualPageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'resumen-anual',
        loadChildren: () => import('../resumen-anual/resumen-anual.module').then( m => m.ResumenAnualPageModule),
        canActivate:[AuthGuard]
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
