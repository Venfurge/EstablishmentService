export class ChangeUserPasswordRequest {
  public newPassword: string;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
