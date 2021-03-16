import { UserModel } from "../user/user.model";

export class LoginResponse {
  public token: string;
  public user: UserModel;
}
