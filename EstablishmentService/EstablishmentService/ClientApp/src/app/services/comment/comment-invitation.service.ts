import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MealModel } from '../../models/meal/meal.model';
import { APICommentInvitationService } from '../api/api-comment/api-comment-invitation.service';
import { DialogService } from '../dialog.service';

@Injectable()
export class CommentInvitationService {
  onCreateInvite: Subject<number[]>;
  onAcceptInvite: Subject<string>;
  onCleanInvite: Subject<any>;
  onCleanCheckedMeals: Subject<any>;
  onCheckMeal: Subject<number>;
  onUncheckMeal: Subject<number>;

  onInviteChanged: BehaviorSubject<string>;
  onInviteIsAlive: BehaviorSubject<boolean>;
  onMealsForComment: BehaviorSubject<MealModel[]>;
  onCheckedMealsIdsChanged: BehaviorSubject<number[]>;

  private _checkedMeals: number[] = [];

  constructor(
    private _apiService: APICommentInvitationService,
    private _dialogService: DialogService,
  ) {
    this._checkedMeals = [];

    this.onCreateInvite = new Subject();
    this.onAcceptInvite = new Subject();
    this.onCleanInvite = new Subject();
    this.onCleanCheckedMeals = new Subject();
    this.onCheckMeal = new Subject();
    this.onUncheckMeal = new Subject();

    this.onInviteChanged = new BehaviorSubject(null);
    this.onMealsForComment = new BehaviorSubject([]);
    this.onInviteIsAlive = new BehaviorSubject(true);
    this.onCheckedMealsIdsChanged = new BehaviorSubject(this._checkedMeals);

    this.onCreateInvite.subscribe(request => this.createInvite(request));
    this.onAcceptInvite.subscribe(request => this.acceptInvite(request));
    this.onCleanInvite.subscribe(request => this.cleanInvite());
    this.onCleanCheckedMeals.subscribe(request => this.cleanCheckedMeals());
    this.onCheckMeal.subscribe(mealId => this.checkMeal(mealId));
    this.onUncheckMeal.subscribe(mealId => this.uncheckMeal(mealId));
  }

  private async createInvite(request: number[]) {
    let response = await this._apiService.createCommentInvite(request);

    if (response.success) {
      this.onInviteChanged.next(response.model);
      this._dialogService.showSnackBar('Запрошення успішно створено!');
      return;
    }

    switch (response.status) {
      case 404:
        this._dialogService.showSnackBar('Страв не знайдено!');
        break;
    }
  }

  private async cleanInvite() {
    this.onInviteChanged.next(null);
  }

  private async cleanCheckedMeals() {
    this._checkedMeals = [];
    this.onCheckedMealsIdsChanged.next(this._checkedMeals);
  }

  private async acceptInvite(request: string) {
    let response = await this._apiService.acceptCommentInvite(request);

    if (response.success) {
      this.onInviteIsAlive.next(true);
      this.onMealsForComment.next(response.model);
      return;
    }

    switch (response.status) {
      case 400:
        this.onInviteIsAlive.next(false);
        this.onMealsForComment.next([]);
        break;
      case 404:
        this._dialogService.showSnackBar('Заклад не знайдено!');
        this.onInviteIsAlive.next(false);
        this.onMealsForComment.next([]);
        break;
    }
  }

  private checkMeal(mealId: number) {
    this._checkedMeals.push(mealId);
    this.onCheckedMealsIdsChanged.next(this._checkedMeals);
  }

  private uncheckMeal(movieId: number) {
    this._checkedMeals = this._checkedMeals.filter(id => id != movieId);
    this.onCheckedMealsIdsChanged.next(this._checkedMeals);
  }
}
