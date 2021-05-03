export class AddMealCommentRequest {
  public comment: string;
  public mealId: number;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
