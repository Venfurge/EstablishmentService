export class WorkerRemovedModel {
  isChanged: boolean;
  token: string = null;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
