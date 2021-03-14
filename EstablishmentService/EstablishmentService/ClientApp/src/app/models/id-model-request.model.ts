export class IdModelRequest<T> {
  public id: number;
  public model: T;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
