export class LoginRequest {
  public login: string;
  public password: string;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
