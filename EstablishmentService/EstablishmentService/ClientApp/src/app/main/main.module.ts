import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

//Material Modules
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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';

//Modules
import { DragAndDropFileModule } from '../shared/drag-and-drop-file/drag-and-drop-file.module';
import { QRCodeModule } from 'angularx-qrcode';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PopoverModule } from 'ngx-smart-popover';

//Components
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangeUserPasswordComponent } from './profile/change-user-password/change-user-password.component';
import { ChangeProfileImageComponent } from './profile/change-profile-image/change-profile-image.component';
import { EstablishmentsComponent } from './profile/owner/establishments/establishments.component';
import { EditEstablishmentComponent } from './profile/owner/establishments/edit-establishment/edit-establishment.component';
import { MealsComponent } from './profile/owner/meals/meals.component';
import { MealsListComponent } from './profile/owner/meals/meals-list/meals-list.component';
import { MealsSearchComponent } from './profile/owner/meals/meals-search/meals-search.component';
import { EditMealComponent } from './profile/owner/meals/edit-meal/edit-meal.component';
import { AddMealComponent } from './profile/owner/meals/add-meal/add-meal.component';
import { WorkerInvitationComponent } from './profile/owner/workers/worker-invitation/worker-invitation.component';
import { WorkersComponent } from './profile/owner/workers/workers.component';
import { InviteAcceptComponent } from './invite-accept/invite-accept.component';
import { WorkersListComponent } from './profile/owner/workers/workers-list/workers-list.component';
import { WorkerSearchComponent } from './profile/owner/workers/worker-search/worker-search.component';
import { WorkEstablishmentsComponent } from './profile/work-establishments/work-establishments.component';
import { MainPageListComponent } from './main-page/main-page-list/main-page-list.component';
import { MainPageSearchComponent } from './main-page/main-page-search/main-page-search.component';
import { MealCardComponent } from './main-page/main-page-list/meal-card/meal-card.component';
import { MealPageComponent } from './meal-page/meal-page.component';
import { LeaveCommentComponent } from './profile/leave-comment/leave-comment.component';
import { CommentMealsSearchComponent } from './profile/leave-comment/comment-meals-search/comment-meals-search.component';
import { CommentMealsListComponent } from './profile/leave-comment/comment-meals-list/comment-meals-list.component';
import { CommentInvitationComponent } from './profile/leave-comment/comment-invitation/comment-invitation.component';
import { LeavingCommentsComponent } from './leaving-comments/leaving-comments.component';

//Services
import { MealResolverService } from '../services/meal/meal-resolver.service';

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
    path: 'invite-accept/:token',
    component: InviteAcceptComponent,
  },
  {
    path: 'leave-comment/:token',
    component: LeavingCommentsComponent,
  },
  {
    path: 'meal/:id',
    component: MealPageComponent,
    resolve: [MealResolverService],
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
    WorkersComponent,
    WorkerInvitationComponent,
    InviteAcceptComponent,
    WorkersListComponent,
    WorkerSearchComponent,
    WorkEstablishmentsComponent,
    MainPageListComponent,
    MainPageSearchComponent,
    MealCardComponent,
    MealPageComponent,
    LeaveCommentComponent,
    CommentMealsSearchComponent,
    CommentMealsListComponent,
    CommentInvitationComponent,
    LeavingCommentsComponent,
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
    WorkersComponent,
    WorkerInvitationComponent,
    WorkersListComponent,
    WorkerSearchComponent,
    WorkEstablishmentsComponent,
    MealCardComponent,
    LeaveCommentComponent,
    CommentMealsSearchComponent,
    CommentMealsListComponent,
    CommentInvitationComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,

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
    MatExpansionModule,

    QRCodeModule,
    InfiniteScrollModule,
    PopoverModule,
    ClipboardModule,
    DragAndDropFileModule,
  ],
  providers: [
    MealResolverService,
  ],
})
export class MainModule { }
