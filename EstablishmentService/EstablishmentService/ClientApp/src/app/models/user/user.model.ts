export class UserModel {
  public id: number;
  public login: string;
  public firstName: string;
  public secondName: string;
  public imageName: string;
  public imageLink: string;
  public role: string;

  constructor() {
    this.id = null;
    this.login = "";
    this.firstName = "";
    this.secondName = "";
    this.imageName = null;
    this.imageLink = null;
    this.role = "";
  }
}
