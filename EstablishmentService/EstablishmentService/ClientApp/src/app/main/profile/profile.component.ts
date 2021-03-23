import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditUserRequest } from '../../models/user/edit-user-request.model';
import { UserModel } from '../../models/user/user.model';
import { DialogService } from '../../services/dialog.service';
import { ProfileService } from '../../services/profile.service';
import { ChangeProfileImageComponent } from './change-profile-image/change-profile-image.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  form: FormGroup;
  userProfile: UserModel;

  isLoginValid: boolean = true;

  private _unsubscribe: Subject<any>;

  constructor(
    public dialog: MatDialog,
    private _builder: FormBuilder,
    private _dialogService: DialogService,
    private _profileService: ProfileService,
    private _router: Router,
  ) {
    this._unsubscribe = new Subject<any>();

    if (!localStorage.getItem('token'))
      this._router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this._profileService.onUserChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(request => {
        this.userProfile = request;

        if (this.userProfile != null)
          this.form = this.createForm();
      });

    this._profileService.onChangeLoginFailed
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((isValid) => {
        if (isValid != null) {
          if (isValid) {
            this.isLoginValid = !isValid;
            this.form.controls.login.setValue(this.form.controls.login.value);
          }
          else {
            this._profileService.onChangeLoginFailed.next(null);
          }
        }
      });
  }

  createForm() {
    let form = this._builder.group({
      login: [this.userProfile.login || '', [Validators.required, this.userLoginValidator()]],
      firstName: [this.userProfile.firstName || '', [Validators.required]],
      secondName: [this.userProfile.secondName || '', [Validators.required]],
    });

    form.controls.login.valueChanges
      .subscribe((value) => {
        this.isLoginValid = true;
      });

    return form;
  }

  changeAvatar(): void {
    let dialogRef = this.dialog.open(ChangeProfileImageComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '340px',
      data: {
        isAdminUse: false,
        userProfile: null,
      }
    });
  }

  changePassword(): void {
    let dialogRef = this.dialog.open(ChangeUserPasswordComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '600px',
      data: {
        userProfile: null,
      },
    });
  }

  editProfile(): void {
    if (!this.form.valid) {
      this._dialogService.showSnackBar("Перевірте форму будь-ласка");
      this.touchForm(this.form);
      return;
    }

    let request = new EditUserRequest({
      login: this.form.value.login,
      firstName: this.form.value.firstName,
      secondName: this.form.value.secondName,
    });

    this._profileService.onEditProfile.next(request);
  }

  touchForm(form: FormGroup) {
    (<any>Object).values(form.controls).forEach(control => {
      if (control.controls) this.touchForm(control);
      else control.markAsTouched();
    });
  }

  userLoginValidator(): (control: FormControl) => { [s: string]: boolean } {
    return (control: FormControl) => {
      if (!this.isLoginValid)
        return { loginValid: true };

      return null;
    };
  }

  ngOnDestroy() {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
