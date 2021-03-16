export class EditUserRequest {
  public login: string;
  public firstName: string;
  public secondName: string;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
