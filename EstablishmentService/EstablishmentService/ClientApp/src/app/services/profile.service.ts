import { Injectable } from '@angular/core';
import { APIProfileService } from './api/api-profile.service';
import { DialogService } from './dialog.service';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { EditUserRequest } from '../models/user/edit-user-request.model';
import { ChangeUserPasswordRequest } from '../models/user/change-user-password-request.model';
import { UserModel } from '../models/user/user.model';
import { IdModelRequest } from '../models/id-model-request.model';

@Injectable()
export class ProfileService {

  onGetProfile: Subject<any>;
  onEditProfile: Subject<EditUserRequest>;
  onEditProfileImage: Subject<IdModelRequest<FormData>>;
  onDeleteProfileImage: Subject<any>;
  onChangePassword: Subject<ChangeUserPasswordRequest>;
  onLogout: Subject<any>;

  onUserChanged: BehaviorSubject<UserModel>
  onChangePasswordFailed: BehaviorSubject<boolean>;
  onChangeProfileImage: BehaviorSubject<boolean>;
  onChangeLoginFailed: BehaviorSubject<boolean>;

  constructor(
    private _apiService: APIProfileService,
    private _dialogService: DialogService,
    private _router: Router,
  ) {
    this.onGetProfile = new Subject();
    this.onEditProfile = new Subject();
    this.onEditProfileImage = new Subject();
    this.onDeleteProfileImage = new Subject();
    this.onChangePassword = new Subject();
    this.onLogout = new Subject();

    this.onUserChanged = new BehaviorSubject(new UserModel());
    this.onChangePasswordFailed = new BehaviorSubject(null);
    this.onChangeProfileImage = new BehaviorSubject(false);
    this.onChangeLoginFailed = new BehaviorSubject(null);

    this.onGetProfile.subscribe(request => this.getProfile());
    this.onEditProfile.subscribe(request => this.editProfile(request));
    this.onEditProfileImage.subscribe(request => this.editProfileImage(request));
    this.onDeleteProfileImage.subscribe(request => this.deleteProfileImage());
    this.onChangePassword.subscribe(request => this.changePassword(request));
    this.onLogout.subscribe(request => this.logout());

    if (localStorage.getItem('token') != null)
      this.onGetProfile.next(null);
  }

  private async getProfile() {
    let response = await this._apiService.getProfile();

    if (response.success) {
      this.onUserChanged.next(response.model);
    }
  }

  private async editProfile(request: EditUserRequest) {
    let response = await this._apiService.editProfile(request);

    if (response.success) {
      this.getProfile();
      this.onChangeLoginFailed.next(false);
      this._dialogService.showSnackBar('Профіль успішно змінено!');
      return;
    }

    switch (response.status) {
      case 400:
        this.onChangeLoginFailed.next(true);
        break;
    }
  }

  private async editProfileImage(request: IdModelRequest<FormData>) {
    this.onChangeProfileImage.next(true);
    let response = await this._apiService.editUserProfileImage(request);

    if (response.success) {
      this.onUserChanged.next(response.model);
      this.onChangeProfileImage.next(false);
      this._dialogService.showSnackBar('Успішно змінено!');
    }

    switch (response.status) {
      case 400:
        this.onChangeProfileImage.next(false);
        this._dialogService.showSnackBar('Виберіть фото!');
        break;
      case 404:
        this.onChangeProfileImage.next(false);
        this._dialogService.showSnackBar('Немає такого користувача або картинки');
        break;
    }
  }

  private async deleteProfileImage() {
    let response = await this._apiService.deleteUserProfileImage();

    if (response.success) {
      this.onUserChanged.next(response.model);
      this._dialogService.showSnackBar('Успішно видалено!')
    }

    switch (response.status) {
      case 400:
        this._dialogService.showSnackBar('Фото не змінено!');
        break;
      case 404:
        this._dialogService.showSnackBar('Немає такого користувача або картинки');
        break;
    }
  }

  private async changePassword(request: ChangeUserPasswordRequest) {
    let response = await this._apiService.changePassword(request);

    if (response.success) {
      this._dialogService.showSnackBar('Успішно змінено!');
      this.onChangePasswordFailed.next(false);
      return;
    }

    switch (response.status) {
      case 400:
        this.onChangePasswordFailed.next(true);
        break;
      case 404:
        this._dialogService.showSnackBar('Немає такого користувача');
        break;
    }
  }

  private async logout() {
    localStorage.removeItem('token');
    this.onUserChanged.next(null);
    this._router.navigateByUrl('');
  }
}
