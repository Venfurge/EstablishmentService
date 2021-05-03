import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MealCommentModel } from '../../models/comment/meal-comment.model';
import { MealModel } from '../../models/meal/meal.model';
import { CommentService } from '../../services/comment/comment.service';
import { MealResolverService } from '../../services/meal/meal-resolver.service';

@Component({
  selector: 'meal-page',
  templateUrl: './meal-page.component.html',
  styleUrls: ['./meal-page.component.scss']
})
export class MealPageComponent implements OnInit, OnDestroy {

  public meal: MealModel;
  public comments: MealCommentModel[];

  public isLoading: boolean = false;

  private _unsubscribe: Subject<any>;

  constructor(
    private _mealResolverService: MealResolverService,
    private _commentService: CommentService,
  ) {
    this._unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this._commentService.onMealCommentsChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(comments => {
        this.comments = comments;
      });

    this._mealResolverService.onCurrentMealChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(meal => {
        this.meal = meal;

        if (meal) {
          this._commentService.onGetMealComments.next(this.meal.id);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
