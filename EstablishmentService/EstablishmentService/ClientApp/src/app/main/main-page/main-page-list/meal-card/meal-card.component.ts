import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MealModel } from '../../../../models/meal/meal.model';

@Component({
    selector: 'meal-card',
    templateUrl: './meal-card.component.html',
    styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit, OnDestroy {

  @Input() meal: MealModel;

  private _unsubscribe: Subject<any>;

  constructor(
  ) {
    this._unsubscribe = new Subject();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
