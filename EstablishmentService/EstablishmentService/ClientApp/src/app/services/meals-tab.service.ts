import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class MealsTabService {

  onGetMealTabIndex: Subject<any>;
  onEditMealTabIndex: Subject<number>;

  onMealTabIndexChanged: BehaviorSubject<number>;

  mealTabIndex: number;

  constructor(
  ) {
    this.mealTabIndex = null;

    this.onGetMealTabIndex = new Subject();
    this.onEditMealTabIndex = new Subject();

    this.onMealTabIndexChanged = new BehaviorSubject(this.mealTabIndex);

    this.onGetMealTabIndex.subscribe(request => this.getMealTabIndex());
    this.onEditMealTabIndex.subscribe(index => this.editMealTabIndex(index));
  }

  private async getMealTabIndex() {
    this.onMealTabIndexChanged.next(this.mealTabIndex);
    return;
  }

  private async editMealTabIndex(index: number) {
    this.mealTabIndex = index;
    this.getMealTabIndex(); 
  }
}
