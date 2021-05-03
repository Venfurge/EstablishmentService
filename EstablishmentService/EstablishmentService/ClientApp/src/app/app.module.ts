import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

//Angular Material Modules
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

//Modules
import { MainModule } from './main/main.module';
import { DialogModule } from './shared/dialog.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PopoverModule } from 'ngx-smart-popover';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';

//API Services
import { APIAuthService } from './services/api/api-auth.service';
import { APIProfileService } from './services/api/api-profile.service';
import { APIRegisterService } from './services/api/api-register.service';
import { APIMealService } from './services/api/api-meal.service';
import { APIEstablishmentService } from './services/api/api-establishment/api-establishment.service';
import { APIEstablishmentWorkerService } from './services/api/api-establishment/api-establishment-worker.service';
import { APIWorkEstablishmentService } from './services/api/api-establishment/api-work-establishment.service';
import { APICommentInvitationService } from './services/api/api-comment/api-comment-invitation.service';
import { APICommentService } from './services/api/api-comment/api-comment.service';

//Services
import { DialogService } from './services/dialog.service';
import { HeadersService } from './services/headers.service';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { RegisterService } from './services/register.service';
import { LayoutService } from './services/layout.service';
import { EstablishmentService } from './services/establishment/establishment.service';
import { MealService } from './services/meal/meal.service';
import { MealsTabService } from './services/meal/meals-tab.service';
import { EstablishmentWorkerService } from './services/establishment/establishment-worker.service';
import { WorkEstablishmentService } from './services/establishment/work-establishment.service';
import { CommentInvitationService } from './services/comment/comment-invitation.service';
import { CommentService } from './services/comment/comment.service';

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
    InfiniteScrollModule,
    PopoverModule,
  ],
  providers: [
    HeadersService,
    LayoutService,
    DialogService,

    APIAuthService,
    APIProfileService,
    APIRegisterService,
    APIEstablishmentService,
    APIMealService,
    APIEstablishmentWorkerService,
    APIWorkEstablishmentService,
    APICommentInvitationService,
    APICommentService,

    AuthService,
    ProfileService,
    RegisterService,
    EstablishmentService,
    MealService,
    MealsTabService,
    EstablishmentWorkerService,
    WorkEstablishmentService,
    CommentInvitationService,
    CommentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
