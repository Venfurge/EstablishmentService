import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { LoginRequest } from "../models/auth/login-request.model";
import { APIAuthService } from "./api/api-auth.service";
import { HeadersService } from "./headers.service";
import { ProfileService } from "./profile.service";

type loginFailed = "login" | "password";

@Injectable()
export class AuthService {

  onLogin: Subject<LoginRequest>;

  onTokenChanged: BehaviorSubject<string>;
  onLoginFailedChanged: BehaviorSubject<loginFailed>;

  public get token() {
    return this.onTokenChanged.value;
  }

  constructor(
    private _apiService: APIAuthService,
    private _profileService: ProfileService,
    private _headersService: HeadersService,
  ) {

    this.onLogin = new Subject();

    this.onTokenChanged = new BehaviorSubject(localStorage.getItem('token'));
    this.onLoginFailedChanged = new BehaviorSubject(null);

    this.onLogin.subscribe(request => this.login(request));
    this.onTokenChanged.subscribe(token => {
      if (token != null)
        localStorage.setItem('token', token);

      this._headersService.tokenChanged(token);
    });
  }

  private async login(request: LoginRequest) {
    let response = await this._apiService.login(request);

    if (response.success) {
      this._profileService.onUserChanged.next(response.model.user);
      this.onTokenChanged.next(response.model.token);
      this.onLoginFailedChanged.next(null);
      return;
    }

    switch (response.status) {
      case 400:
        this.onLoginFailedChanged.next("password");
        break;
      case 404:
        this.onLoginFailedChanged.next("login");
        break;
    }
  }
}
