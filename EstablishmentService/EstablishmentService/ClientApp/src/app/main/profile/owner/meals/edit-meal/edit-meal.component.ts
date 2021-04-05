import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditMealRequestModel } from '../../../../../models/meal/edit-meal-request.model';
import { MealModel } from '../../../../../models/meal/meal.model';
import { DialogService } from '../../../../../services/dialog.service';
import { MealService } from '../../../../../services/meal.service';

@Component({
  selector: 'edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.scss']
})
export class EditMealComponent implements OnInit, OnDestroy {

  file: File = null;
  form: FormGroup;
  meal: MealModel;
  mealTabIndex: number = null;

  isFileOver: boolean = false;
  isChanged: boolean = false;

  private _unsubscribe: Subject<any>;

  constructor(
    private _mealService: MealService,
    private _builder: FormBuilder,
    private _dialogService: DialogService,
    public dialogRef: MatDialogRef<EditMealComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.meal = data.meal;
    this.mealTabIndex = data.mealTabIndex;

    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this._mealService.onMealChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(meal => {

        if (meal != null) {
          this.meal = meal;
          this.form = this.createForm();
        }
      });

    this._mealService.onChangeMealImage
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(isChanged => {
        this.isChanged = isChanged;
      });

    this.form = this.createForm();
  }

  createForm() {
    let form = this._builder.group({
      name: [this.meal.name || '', [Validators.required]],
      description: [this.meal.description || '', [Validators.required]],
      price: [this.meal.price || null, [Validators.required, Validators.pattern(/^[0-9]{1,8}([.][0-9]{1,2})?$/)]],
      weight: [this.meal.weight || null, [Validators.required, Validators.pattern(/^[0-9]+?$/)]],
    });

    return form;
  }

  filesUploaded(file: File): void {
    if (!file[0].type.includes('image/')) {
      this._dialogService.showSnackBar('Файл повинен бути типу .jpg, .png');
      return;
    }

    this._dialogService.showConfirmationDialog("Для того, щоб якість картинки була найкращою, ми рекомендуємо вам завантажувати фото розширення 512x512.",
      result => {

        this.file = file[0];

        let formData = new FormData();
        formData.append('Image', this.file);

        this._mealService.onEditMealImage.next({ id: this.meal.id, model: formData });
      });
  }

  updatePhoto(): void {
    if (this.file == null) {
      this._dialogService.showConfirmationDialog("Якщо ви не виберете файл, фото буде стандартним",
        result => {
          if (result)
            this._mealService.onDeleteMealImage.next(null);
        });

      return;
    }

    let formData = new FormData();
    formData.append('Image', this.file);

    this._mealService.onEditMealImage.next({ id: this.meal.id, model: formData });
  }

  editMeal(): void {
    if (!this.form.valid) {
      this._dialogService.showSnackBar("Перевірте форму будь-ласка");
      this.touchForm(this.form);
      return;
    }

    let request = new EditMealRequestModel(this.form.value);

    this._mealService.onEditMeal.next({ id: this.meal.id, model: request });
  }

  deletePhoto(): void {
    this.file = null;
    this._mealService.onDeleteMealImage.next(this.meal.id);
    this._dialogService.showSnackBar('Фото видалено');
  }

  touchForm(form: FormGroup) {
    (<any>Object).values(form.controls).forEach(control => {
      if (control.controls) this.touchForm(control);
      else control.markAsTouched();
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
