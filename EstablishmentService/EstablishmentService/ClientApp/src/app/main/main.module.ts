import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
]

@NgModule({
  declarations: [
    MainPageComponent,
  ],
  entryComponents: [
    MainPageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
})
export class MainModule { }
