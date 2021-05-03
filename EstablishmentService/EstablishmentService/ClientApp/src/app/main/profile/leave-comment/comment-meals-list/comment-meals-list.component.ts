import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IdModelRequest } from '../../../../models/id-model-request.model';
import { GetMealsRequestModel } from '../../../../models/meal/get-meals-request.model';
import { MealModel } from '../../../../models/meal/meal.model';
import { CommentInvitationService } from '../../../../services/comment/comment-invitation.service';
import { DialogService } from '../../../../services/dialog.service';
import { MealService } from '../../../../services/meal/meal.service';

@Component({
  selector: 'comment-meals-list',
  templateUrl: './comment-meals-list.component.html',
  styleUrls: ['./comment-meals-list.component.scss']
})
export class CommentMealsListComponent implements OnInit, OnDestroy {

  @Input() establishmentId: number;

  public mealsList: MealModel[] = [];
  public request: IdModelRequest<GetMealsRequestModel>;
  public totalCount: number;
  public isLoading: boolean = false;

  private _checkedIds: number[] = [];
  private _unsubscribe: Subject<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _mealService: MealService,
    private _commentInvitationService: CommentInvitationService,
    private _dialogService: DialogService,
  ) {
    this._unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this._commentInvitationService.onCheckedMealsIdsChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(ids => {
        this._checkedIds = ids;
      })

    this._mealService.onGetMealsRequestChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(request => {
        if (request == null) {
          this.request = {
            id: this.establishmentId,
            model: new GetMealsRequestModel({
              pn: 0,
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
        this.mealsList = list.items;
        this.totalCount = list.totalCount;
      });

    this.paginator.page.subscribe((p: PageEvent) => {
      this.request.model.pn = p.pageIndex;
      this.request.model.ps = p.pageSize;
      this._mealService.onGetMeals.next(this.request);
    });

    this._mealService.onGetMeals.next(null);
  }

  isChecked(id: number): boolean {
    return this._checkedIds.includes(id);
  }

  check($event, id: number) {
    if ($event.checked) {
      this._commentInvitationService.onCheckMeal.next(id);
      return;
    }

    this._commentInvitationService.onUncheckMeal.next(id);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
