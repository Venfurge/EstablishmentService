export class GetMealsRequestModel {
  pn: number = 0;
  ps: number = 10;
  sort: string = 'id';
  sortDir: string = 'asc';
  find: string = null;

  constructor(model) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
