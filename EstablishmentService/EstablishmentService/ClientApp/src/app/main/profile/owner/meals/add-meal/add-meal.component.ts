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
    selector: 'add-meal',
    templateUrl: './add-meal.component.html',
    styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit, OnDestroy {

  file: File = null;
  imageSrc: string = null;
  form: FormGroup;
  meal: MealModel;
  mealTabIndex: number = null;

  isImageNeedsToChange: boolean = false;
  isFileOver: boolean = false;
  isChanged: boolean = false;

  private _unsubscribe: Subject<any>;

  constructor(
    private _mealService: MealService,
    private _builder: FormBuilder,
    private _dialogService: DialogService,
    public dialogRef: MatDialogRef<AddMealComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.mealTabIndex = data.mealTabIndex;

    this._unsubscribe = new Subject<any>();
    this.meal = new MealModel();
  }

  ngOnInit(): void {
    this._mealService.onMealChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(meal => {
        if (meal != null) {
          this.meal = meal;

          if (this.isImageNeedsToChange) {
            let formData = new FormData();
            formData.append('Image', this.file);

            this.isImageNeedsToChange = false;
            this._mealService.onEditMealImage.next({ id: this.meal.id, model: formData });
          }

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

        let reader = new FileReader();

        reader.onload = e => this.imageSrc = reader.result.toString();
        reader.readAsDataURL(this.file);

        this.isImageNeedsToChange = true;
      });
  }

  //do nothing
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

  addMeal(): void {
    if (!this.form.valid && this.file) {
      this._dialogService.showSnackBar("Перевірте форму будь-ласка");
      this.touchForm(this.form);
      return;
    }


    let request = new EditMealRequestModel(this.form.value);

    this._mealService.onAddMeal.next({ id: this.mealTabIndex, model: request });
  }

  deletePhoto(): void {
    this.imageSrc = null;
    this.file = null;
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
