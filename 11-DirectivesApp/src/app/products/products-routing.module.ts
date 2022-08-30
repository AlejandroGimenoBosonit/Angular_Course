import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'add', component: AddComponent },
      { path: '**', redirectTo: 'add' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
