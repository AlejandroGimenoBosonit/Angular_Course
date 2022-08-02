import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { BasicsComponent } from '../../sales/pages/basics/basics.component';
import { NumbersComponent } from '../../sales/pages/numbers/numbers.component';
import { NotCommonComponent } from '../../sales/pages/not-common/not-common.component';
import { SortComponent } from '../../sales/pages/sort/sort.component';

const customRoutes: Routes = [
  // main route
  {
    path: '',
    pathMatch: 'full',
    component: BasicsComponent
  },
  {
    path: 'numbers',
    component: NumbersComponent
  },
  {
    path: 'not-common',
    component: NotCommonComponent
  },
  {
    path: 'sort',
    component: SortComponent
  },
  // default route
  {
    path: '**',
    redirectTo: '' // redirect to main route
  }
]

@NgModule({
  declarations: [],
  imports: [
    // Main routes
    RouterModule.forRoot( customRoutes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
