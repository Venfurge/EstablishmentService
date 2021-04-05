import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IdModelRequest } from '../models/id-model-request.model';
import { EditMealRequestModel } from '../models/meal/edit-meal-request.model';
import { GetMealsRequestModel } from '../models/meal/get-meals-request.model';
import { MealModel } from '../models/meal/meal.model';
import { PagingList } from '../models/paging-list.model';
import { APIMealService } from './api/api-meal.service';
import { DialogService } from './dialog.service';

@Injectable()
export class MealService {

  onGetMeals: Subject<IdModelRequest<GetMealsRequestModel>>;
  onAddMeal: Subject<IdModelRequest<EditMealRequestModel>>;
  onEditMealsRequest: Subject<IdModelRequest<GetMealsRequestModel>>;
  onEditMeal: Subject<IdModelRequest<EditMealRequestModel>>;
  onEditMealImage: Subject<IdModelRequest<FormData>>;
  onDeleteMealImage: Subject<number>;
  onDeleteMeal: Subject<number>;

  onMealsChanged: BehaviorSubject<PagingList<MealModel>>
  onMealChanged: BehaviorSubject<MealModel>
  onChangeMealImage: BehaviorSubject<boolean>;

  onGetMealsRequestChanged: BehaviorSubject<IdModelRequest<GetMealsRequestModel>>;
  onMealsLoadingChanged: BehaviorSubject<boolean>;

  request: IdModelRequest<GetMealsRequestModel>;

  constructor(
    private _apiService: APIMealService,
    private _dialogService: DialogService,
  ) {
    this.request = null;

    this.onGetMeals = new Subject();
    this.onAddMeal = new Subject();
    this.onEditMealsRequest = new Subject();
    this.onEditMeal = new Subject();
    this.onEditMealImage = new Subject();
    this.onDeleteMealImage = new Subject();
    this.onDeleteMeal = new Subject();

    this.onMealsChanged = new BehaviorSubject(new PagingList<MealModel>());
    this.onMealChanged = new BehaviorSubject(null);
    this.onChangeMealImage = new BehaviorSubject(false);

    this.onGetMealsRequestChanged = new BehaviorSubject(this.request);
    this.onMealsLoadingChanged = new BehaviorSubject(false);

    this.onGetMeals.subscribe(request => {
      if (request != null) {
        this.request = request;
        this.onGetMealsRequestChanged.next(this.request);
      }

      this.getMeals();
    });

    this.onAddMeal.subscribe(request => this.addMeal(request));
    this.onEditMealsRequest.subscribe(request => this.request = request);
    this.onEditMeal.subscribe(request => this.editMeal(request));
    this.onEditMealImage.subscribe(request => this.editMealImage(request));
    this.onDeleteMealImage.subscribe(request => this.deleteMealImage(request));
    this.onDeleteMeal.subscribe(request => this.deleteMeal(request));
  }

  private async getMeals() {
    this.onMealsLoadingChanged.next(true);
    let response = await this._apiService.getMeals(this.request);
    this.onMealsLoadingChanged.next(false);

    if (response.success) {
      this.onMealsChanged.next(response.model);
      return;
    }
  }

  private async addMeal(request: IdModelRequest<EditMealRequestModel>): Promise<void> {
    let response = await this._apiService.addMeal(request);

    if (response.success) {
      this.onMealChanged.next(response.model);
      this.onGetMeals.next(null);
      this._dialogService.showSnackBar("Додано");
      return;
    }

    this._dialogService.showSnackBar("Не додано");
  }

  private async editMeal(request: IdModelRequest<EditMealRequestModel>) {
    let response = await this._apiService.editMeal(request);

    if (response.success) {
      this.onMealChanged.next(response.model);
      this.getMeals();
      this._dialogService.showSnackBar('Успішно змінено!');
      return;
    }

    switch (response.status) {
      case 404:
        this._dialogService.showSnackBar('Заклад не знайдено!');
        break;
    }
  }

  private async editMealImage(request: IdModelRequest<FormData>) {
    this.onChangeMealImage.next(true);
    let response = await this._apiService.editMealImage(request);

    if (response.success) {
      this.onMealChanged.next(response.model);
      this.getMeals();
      this.onChangeMealImage.next(false);
      this._dialogService.showSnackBar('Успішно змінено!');
      return;
    }

    switch (response.status) {
      case 404:
        this._dialogService.showSnackBar('Заклад не знайдено!');
        break;
    }
  }

  private async deleteMealImage(request: number) {
    let response = await this._apiService.deleteMealImage(request);

    if (response.success) {
      this.onMealChanged.next(response.model);
      this.getMeals();
      this._dialogService.showSnackBar('Успішно видалено!')
    }

    switch (response.status) {
      case 400:
        this._dialogService.showSnackBar('Фото не змінено!');
        break;
      case 404:
        this._dialogService.showSnackBar('Немає такого закладу або картинки');
        break;
    }
  }

  private async deleteMeal(request: number) {
    let response = await this._apiService.deleteMeal(request);

    if (response.success) {
      this.onGetMeals.next(null);
      this._dialogService.showSnackBar("Видалено");
      return;
    }

    this._dialogService.showSnackBar("Не видалено");
  }
}
