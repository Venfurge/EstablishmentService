  import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DialogModule } from './shared/dialog.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MainModule } from './main/main.module';
import { DialogService } from './services/dialog.service';
import { HeadersService } from './services/headers.service';
import { APIAuthService } from './services/api/api-auth.service';
import { APIProfileService } from './services/api/api-profile.service';
import { APIRegisterService } from './services/api/api-register.service';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { RegisterService } from './services/register.service';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutService } from './services/layout.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './main/main.module#MainModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),

    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    DialogModule,
    MainModule,
  ],
  providers: [
    HeadersService,
    LayoutService,
    DialogService,

    APIAuthService,
    APIProfileService,
    APIRegisterService,

    AuthService,
    ProfileService,
    RegisterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
