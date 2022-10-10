import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'agregar-productos',
    loadChildren: () => import('./pages/agregar-productos/agregar-productos.module').then( m => m.AgregarProductosPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'resumen-mensual',
  //   loadChildren: () => import('./pages/resumen-mensual/resumen-mensual.module').then( m => m.ResumenMensualPageModule),
  //   canActivate:[AuthGuard]
  // },
  // {
  //   path: 'resumen-anual',
  //   loadChildren: () => import('./pages/resumen-anual/resumen-anual.module').then( m => m.ResumenAnualPageModule),
  //   canActivate:[AuthGuard]
  // },
  {
    path: 'inicializacion',
    loadChildren: () => import('./pages/inicializacion/inicializacion.module').then( m => m.InicializacionPageModule),
    canActivate:[AuthGuard]
  },
  // {
  //   path: 'balance-turnos',
  //   loadChildren: () => import('./pages/balance-turnos/balance-turnos.module').then( m => m.BalanceTurnosPageModule)
  // },

  // {
  //   path: 'turnos-completo',
  //   loadChildren: () => import('./pages/turnos-completo/turnos-completo.module').then( m => m.TurnosCompletoPageModule)
  // },


  
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
