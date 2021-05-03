import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IdModelRequest } from '../../../models/id-model-request.model';
import { GetMealsRequestModel } from '../../../models/meal/get-meals-request.model';
import { MealModel } from '../../../models/meal/meal.model';
import { MealService } from '../../../services/meal/meal.service';

@Component({
  selector: 'main-page-list',
  templateUrl: './main-page-list.component.html',
  styleUrls: ['./main-page-list.component.scss']
})
export class MainPageListComponent implements OnInit, OnDestroy {

  meals: MealModel[] = [];
  mealPage: number = 0;

  isLoading: boolean = false;
  isScrolled: boolean = false;
  isPageLoading: boolean = true;

  request: IdModelRequest<GetMealsRequestModel>;

  private _unsubscribe: Subject<any>;

  constructor(
    private _mealService: MealService,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this._mealService.onGetMealsRequestChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(request => {
        if (request == null) {
          this.request = {
            id: 1,
            model: new GetMealsRequestModel({
              pn: this.mealPage,
              ps: 10,
              sort: 'id',
              sortDir: 'asc',
              find: null,
            }),
          };
          this._mealService.onEditMealsRequest.next(this.request);
          return;
        }

        this.request = request;
      });

    this._mealService.onMealsLoadingChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });

    this._mealService.onMealsChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(list => {
        if (this.isScrolled) {
          this.meals = this.meals.concat(list.items);
        }
        else {
          this.meals = list.items;
          this.mealPage = 0;
        }

        this.isScrolled = false;
      });

    this._mealService.onGetMeals.next(null);
  }

  onScroll(): void {
    this.isScrolled = true;
    let requestModel = new GetMealsRequestModel({
      pn: ++this.mealPage,
      ps: this.request.model.ps,
      sort: this.request.model.sort,
      sortDir: this.request.model.sortDir,
      find: this.request.model.find,
    });

    this._mealService.onEditMealsRequest.next({ id: 1, model: requestModel });
    this._mealService.onGetMeals.next(null);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
