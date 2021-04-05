export class EditMealRequestModel {
  public name: string;
  public description: string;
  public price: number;
  public weight: number;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
