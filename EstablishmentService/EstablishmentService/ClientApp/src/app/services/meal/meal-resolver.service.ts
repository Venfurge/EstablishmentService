import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MealModel } from '../../models/meal/meal.model';
import { MealService } from './meal.service';

@Injectable()
export class MealResolverService implements Resolve<any> {

  routeParams: any;
  onCurrentMealChanged: BehaviorSubject<MealModel>;

  constructor(
    private _mealService: MealService,
  ) {
    this.onCurrentMealChanged = new BehaviorSubject(new MealModel());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getMovie(),
      ]).then(
        ([files]) => {

          //Some actions...

          resolve(null);
        },
        reject
      );
    });
  }

  public async getMovie(): Promise<void> {
    let mealId = this.routeParams['id'];
    if (mealId == null) return;

    this._mealService.onMealChanged
      .subscribe(meal => {
        this.onCurrentMealChanged.next(meal);
      });

    this._mealService.onGetMealById.next({ id: 1, model: mealId });
  }
}
