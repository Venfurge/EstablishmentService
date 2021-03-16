export class AddUserModel {
  public login: string;
  public password: string;
  public role: string;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
