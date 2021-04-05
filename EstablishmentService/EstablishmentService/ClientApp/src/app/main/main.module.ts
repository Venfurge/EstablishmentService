import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangeUserPasswordComponent } from './profile/change-user-password/change-user-password.component';
import { DragAndDropFileModule } from '../shared/drag-and-drop-file/drag-and-drop-file.module';
import { ChangeProfileImageComponent } from './profile/change-profile-image/change-profile-image.component';
import { EstablishmentsComponent } from './profile/owner/establishments/establishments.component';
import { EditEstablishmentComponent } from './profile/owner/establishments/edit-establishment/edit-establishment.component';
import { MealsComponent } from './profile/owner/meals/meals.component';
import { MealsListComponent } from './profile/owner/meals/meals-list/meals-list.component';
import { MealsSearchComponent } from './profile/owner/meals/meals-search/meals-search.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EditMealComponent } from './profile/owner/meals/edit-meal/edit-meal.component';
import { AddMealComponent } from './profile/owner/meals/add-meal/add-meal.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reg',
    component: RegistrationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
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
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    ChangeUserPasswordComponent,
    ChangeProfileImageComponent,
    EstablishmentsComponent,
    EditEstablishmentComponent,
    MealsComponent,
    MealsListComponent,
    MealsSearchComponent,
    EditMealComponent,
    AddMealComponent,
  ],
  entryComponents: [
    MainPageComponent,
    ChangeUserPasswordComponent,
    ChangeProfileImageComponent,
    EstablishmentsComponent,
    EditEstablishmentComponent,
    MealsComponent,
    MealsListComponent,
    MealsSearchComponent,
    EditMealComponent,
    AddMealComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,

    DragAndDropFileModule,
    MatTabsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class MainModule { }
