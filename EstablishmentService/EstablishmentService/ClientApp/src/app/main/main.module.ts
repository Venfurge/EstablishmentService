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
  ],
  entryComponents: [
    MainPageComponent,
    ChangeUserPasswordComponent,
    ChangeProfileImageComponent,
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
  ],
})
export class MainModule { }
