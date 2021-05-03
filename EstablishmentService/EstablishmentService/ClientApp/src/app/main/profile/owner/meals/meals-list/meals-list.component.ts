import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { GetMealsRequestModel } from '../../../../../models/meal/get-meals-request.model';
import { MealModel } from '../../../../../models/meal/meal.model';
import { DialogService } from '../../../../../services/dialog.service';
import { takeUntil } from 'rxjs/operators';
import { IdModelRequest } from '../../../../../models/id-model-request.model';
import { EditMealComponent } from '../edit-meal/edit-meal.component';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { MealService } from '../../../../../services/meal/meal.service';
import { MealsTabService } from '../../../../../services/meal/meals-tab.service';

@Component({
  selector: 'meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss']
})
export class MealsListComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<MealModel>;
  columnsToDisplay = [
    'id',
    'name',
    'description',
    'weight',
    'price',
    'preview',
    'actions'
  ];
  totalCount: number = 0;
  request: IdModelRequest<GetMealsRequestModel>;
  isLoading: boolean = false;

  mealTabIndex: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private _unsubscribe: Subject<any>;

  constructor(
    private _mealService: MealService,
    private _mealsTabService: MealsTabService,
    private _dialogService: DialogService,
    public dialog: MatDialog,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<MealModel>([]);

    this._mealsTabService.onMealTabIndexChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(index => {
        this.mealTabIndex = index;
      });

    this._mealService.onGetMealsRequestChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(request => {
        if (request == null) {
          this.request = {
            id: this.mealTabIndex,
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
        this.dataSource.data = list.items;
        this.totalCount = list.totalCount;
      });

    this.sort.sortChange.subscribe((s: Sort) => {
      this.request.model.sortDir = s.direction;
      this.request.model.sort = s.active;
      this._mealService.onGetMeals.next(this.request);
    });

    this.paginator.page.subscribe((p: PageEvent) => {
      this.request.model.pn = p.pageIndex;
      this.request.model.ps = p.pageSize;
      this._mealService.onGetMeals.next(this.request);
    });

    this._mealService.onGetMeals.next(null);
  }

  addMeal(): void {
    let dialogRef = this.dialog.open(AddMealComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '600px',
      data: {
        mealTabIndex: this.mealTabIndex,
      }
    });
  }

  editMeal(meal: MealModel): void {
    let dialogRef = this.dialog.open(EditMealComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '600px',
      data: {
        meal: meal,
        mealTabIndex: this.mealTabIndex,
      },
    });
  }

  deleteMeal(id: number) {
    this._dialogService.showConfirmationDialog("Ви впевнені, що хочете видалити цю страву?",
      result => {
        if (result)
          this._mealService.onDeleteMeal.next(id);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
