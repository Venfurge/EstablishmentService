import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '../../../models/user/user.model';
import { DialogService } from '../../../services/dialog.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.scss']
})
export class ChangeUserPasswordComponent {

  form: FormGroup;
  userProfile: UserModel;

  hide: boolean = true;
  hideNew: boolean = true;

  constructor(
    private _profileService: ProfileService,
    private _dialogService: DialogService,
    private _builder: FormBuilder,
    public dialogRef: MatDialogRef<ChangeUserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.userProfile = data.userProfile;

    this.form = this.createForm();
  }

  createForm() {
    let form = this._builder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)]],
      repeatPassword: ['', [Validators.required]],
    },
      { validators: this.mustMatchValidator() }
    );

    return form;
  }

  changePassword() {
    if (!this.form.valid) {
      this._dialogService.showSnackBar("Перевірте форму будь-ласка");
      this.touchForm(this.form);
      return;
    }

    this._profileService.onChangePassword.next({ newPassword: this.form.value.password });
    this.close();
  }

  mustMatchValidator() {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls['password'];
      const matchingControl = formGroup.controls['repeatPassword'];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value)
        matchingControl.setErrors({ mustMatch: true });
      else
        matchingControl.setErrors(null);
    }
  }

  touchForm(form: FormGroup) {
    (<any>Object).values(form.controls).forEach(control => {
      if (control.controls) this.touchForm(control);
      else control.markAsTouched();
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
