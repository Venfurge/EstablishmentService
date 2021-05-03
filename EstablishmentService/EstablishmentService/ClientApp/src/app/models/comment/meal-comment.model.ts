import { UserModel } from "../user/user.model";

export class MealCommentModel {
  public text: string;
  public user: UserModel;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
