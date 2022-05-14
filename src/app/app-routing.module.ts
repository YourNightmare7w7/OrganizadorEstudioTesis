import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'tabs',
    loadChildren: () => import('./page/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'alarm',
    loadChildren: () => import('./page/reloj/alarm/alarm.module').then( m => m.AlarmPageModule)
  },
  {
    path: 'cronometro',
    loadChildren: () => import('./page/reloj/cronometro/cronometro.module').then( m => m.CronometroPageModule)
  },
  {
    path: 'temporizador',
    loadChildren: () => import('./page/reloj/temporizador/temporizador.module').then( m => m.TemporizadorPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./page/calendario/add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'conf',
    loadChildren: () => import('./page/reloj/configu/conf.module').then( m => m.ConfPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
