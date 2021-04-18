export class InviteAcceptModel {
  public isAccepted: boolean;
  public token: string;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
