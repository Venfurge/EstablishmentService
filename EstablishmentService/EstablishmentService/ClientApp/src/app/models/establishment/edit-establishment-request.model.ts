export class EditEstablishmentRequestModel {
  public name: string;
  public description: string;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
