import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'note',
        loadChildren: () => import('../notes/note/note.module').then( m => m.NotePageModule)
      },
      {
        path: 'note/:title',
        loadChildren: () => import('../notes/add-note/add-note.module').then( m => m.AddNotePageModule)
      },
      {
        path: 'reloj',
        loadChildren: () => import('../reloj/reloj/reloj.module').then( m => m.RelojPageModule)
      },
    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
