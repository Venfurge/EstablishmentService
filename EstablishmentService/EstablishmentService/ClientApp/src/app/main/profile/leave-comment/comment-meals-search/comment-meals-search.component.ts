import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IdModelRequest } from '../../../../models/id-model-request.model';
import { GetMealsRequestModel } from '../../../../models/meal/get-meals-request.model';
import { MealService } from '../../../../services/meal/meal.service';

@Component({
  selector: 'comment-meals-search',
  templateUrl: './comment-meals-search.component.html',
  styleUrls: ['./comment-meals-search.component.scss']
})
export class CommentMealsSearchComponent implements OnInit, OnDestroy {

  @Input() establishmentId: number;

  request: IdModelRequest<GetMealsRequestModel>;
  form: FormGroup;

  private _unsubscribe: Subject<any>;

  constructor(
    private _mealService: MealService,
    private _builder: FormBuilder,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
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

    this.form = this.createForm();
  }

  createForm(): FormGroup {
    let form = this._builder.group({
      find: [this.request.model.find || ''],
    });

    return form;
  }

  search() {
    this.request.model.find = this.form.value.find;
    this.request.model.pn = 0;
    this._mealService.onGetMeals.next(this.request);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
