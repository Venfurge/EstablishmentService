import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AddMealCommentRequest } from '../../models/comment/add-meal-comment-request.model';
import { MealCommentModel } from '../../models/comment/meal-comment.model';
import { APICommentService } from '../api/api-comment/api-comment.service';
import { DialogService } from '../dialog.service';

@Injectable()
export class CommentService {
  onGetMealComments: Subject<number>;
  onSetMealsComments: Subject<AddMealCommentRequest[]>;

  onMealCommentsChanged: BehaviorSubject<MealCommentModel[]>;
  onMealsCommented: BehaviorSubject<boolean>;

  constructor(
    private _apiService: APICommentService,
    private _dialogService: DialogService,
  ) {
    this.onGetMealComments = new Subject();
    this.onSetMealsComments = new Subject();

    this.onMealCommentsChanged = new BehaviorSubject([]);
    this.onMealsCommented = new BehaviorSubject(false);

    this.onGetMealComments.subscribe(request => this.getMealComments(request));
    this.onSetMealsComments.subscribe(request => this.setMealsComments(request));
  }

  private async getMealComments(request: number) {
    let response = await this._apiService.getComments(request);

    if (response.success) {
      this.onMealCommentsChanged.next(response.model);
      return;
    }
  }

  private async setMealsComments(request: AddMealCommentRequest[]) {
    let response = await this._apiService.addComments(request);

    if (response.success) {
      this._dialogService.showAlertDialog('Дякуємо за відгук');
      this.onMealsCommented.next(true);
      return;
    }

    switch (response.status) {
      case 400:
        this._dialogService.showSnackBar('Ці страви вже прокоментовано!');
        break;
    }
  }
}
