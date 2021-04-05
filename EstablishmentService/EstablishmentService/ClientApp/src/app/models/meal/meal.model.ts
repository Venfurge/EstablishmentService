import { ImageModel } from "../image/image.model";

export class MealModel {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public weight: number;
  public preview: ImageModel;
}
