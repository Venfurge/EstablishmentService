import { EstablishmentModel } from "../establishment/establishment.model";
import { ImageModel } from "../image/image.model";

export class UserModel {
  public id: number;
  public login: string;
  public firstName: string;
  public secondName: string;
  public role: string;
  public image: ImageModel;
  public establishments: EstablishmentModel[];

  constructor() {
    this.id = null;
    this.login = "";
    this.firstName = "";
    this.secondName = "";
    this.role = "";
    this.image = null;
    this.establishments = null;
  }
}
