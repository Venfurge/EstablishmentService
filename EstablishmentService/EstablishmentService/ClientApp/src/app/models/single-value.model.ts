export class SingleValueModel<T> {
  public value: T;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
