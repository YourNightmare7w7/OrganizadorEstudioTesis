import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'note',
    pathMatch: 'full'
  },
  {
    path: 'note',
    loadChildren: () => import('./page/notes/note/note.module').then( m => m.NotePageModule)
  },
  {
    path: 'note/:title',
    loadChildren: () => import('./page/notes/add-note/add-note.module').then( m => m.AddNotePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
