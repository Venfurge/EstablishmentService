import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { LoginRequest } from '../../models/auth/login-request.model';
import { DialogService } from '../../services/dialog.service';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  isLoginLoading: boolean = false;
  isHide: boolean = true;

  private _unsubscribe: Subject<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _authService: AuthService,
    private _profileService: ProfileService,
    private _router: Router,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this.loginForm = this.createForm();

    this._authService.onLoginFailedChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(failed => {
        if (failed === "login") {
          this._dialogService.showAlertDialog('Неправильний логін');
        }
        if (failed === "password") {
          this._dialogService.showAlertDialog('Неправильний пароль');
        }

        this.isLoginLoading = false;
      });

    this._profileService.onUserChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(user => {
        if (this.isLoginLoading)
          this._router.navigateByUrl('');

        this.isLoginLoading = false;
      });
  }

  createForm(): FormGroup {
    let form = this._formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    return form;
  }

  login(): void {
    if (!this.loginForm.valid) {
      this._dialogService.showSnackBar('Будь ласка перевірте форму!');
      return;
    }

    this.isLoginLoading = true;

    let request = new LoginRequest(this.loginForm.value);
    this._authService.onLogin.next(request);
  }

  ngOnDestroy() {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
