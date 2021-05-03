import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DialogService } from '../../services/dialog.service';
import { RegisterService } from '../../services/register.service';
import { AddUserModel } from '../../models/user/add-user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  registrationForm: FormGroup;

  isLoading: boolean = false;
  isPasswordHide: boolean = true;
  isPasswordCompleteHide: boolean = true;

  private _unsubscribe: Subject<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _registerService: RegisterService,
    private _router: Router,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this.registrationForm = this.createForm();

    this._registerService.onRegisterFailedChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(isFailed => {
        if (isFailed)
          this._dialogService.showAlertDialog('Такий логін уже занятий');
        if (!isFailed && isFailed != null)
          this._router.navigateByUrl('');
        this.isLoading = false;
      });
  }

  createForm(): FormGroup {
    let form = this._formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)]],
      completedPassword: [null, [Validators.required]],
    }, { validators: [this.mustMatchValidator()] });

    return form;
  }

  mustMatchValidator() {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls['password'];
      const matchingControl = formGroup.controls['completedPassword'];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value)
        matchingControl.setErrors({ mustMatch: true });
      else
        matchingControl.setErrors(null);
    }
  }

  register(): void {
    if (!this.registrationForm.valid) {
      this._dialogService.showSnackBar('Будь ласка перевірте форму!');
      return;
    }

    this.isLoading = true;

    let model = new AddUserModel({
      login: this.registrationForm.controls['login'].value,
      password: this.registrationForm.controls['password'].value,
      role: "User",
    });

    console.log(model);
    this._registerService.onRegister.next(model);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
