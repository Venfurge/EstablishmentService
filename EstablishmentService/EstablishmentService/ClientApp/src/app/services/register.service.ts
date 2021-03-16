import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { AddUserModel } from "../models/user/add-user.model";
import { APIRegisterService } from "./api/api-register.service";
import { AuthService } from "./auth.service";

@Injectable()
export class RegisterService {

  onRegister: Subject<AddUserModel>;

  onRegisterFailedChanged: BehaviorSubject<boolean>;

  constructor(
    private _apiService: APIRegisterService,
    private _authService: AuthService,
  ) {

    this.onRegister = new Subject();

    this.onRegisterFailedChanged = new BehaviorSubject(null);

    this.onRegister.subscribe(request => this.register(request));
  }

  private async register(request: AddUserModel) {
    let response = await this._apiService.register(request);

    if (response.success) {
      this.onRegisterFailedChanged.next(false);
      this._authService.onLogin.next({ login: request.login, password: request.password });
      return;
    }

    switch (response.status) {
      case 400:
        this.onRegisterFailedChanged.next(true);
        break;
    }
  }
}
