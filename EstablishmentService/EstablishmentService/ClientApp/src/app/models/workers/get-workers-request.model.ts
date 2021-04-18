export class GetWorkersRequestModel {
  establishmentId: number;
  find: string = null;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
