import { Inject, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EstablishmentModel } from '../../../../../models/establishment/establishment.model';
import { DialogService } from '../../../../../services/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditEstablishmentRequestModel } from '../../../../../models/establishment/edit-establishment-request.model';
import { EstablishmentService } from '../../../../../services/establishment/establishment.service';

@Component({
  selector: 'edit-establishment',
  templateUrl: './edit-establishment.component.html',
  styleUrls: ['./edit-establishment.component.scss']
})
export class EditEstablishmentComponent implements OnInit, OnDestroy {

  file: File = null;
  form: FormGroup;
  establishment: EstablishmentModel;

  isFileOver: boolean = false;
  isChanged: boolean = false;

  private _unsubscribe: Subject<any>;

  constructor(
    private _establishmentsService: EstablishmentService,
    private _builder: FormBuilder,
    private _dialogService: DialogService,
    public dialogRef: MatDialogRef<EditEstablishmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.establishment = data.establishment;

    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this._establishmentsService.onEstablishmentChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(establishment => {

        if (establishment != null) {
          this.establishment = establishment;
          this.form = this.createForm();
        }
      });

    this._establishmentsService.onChangeEstablishmentImage
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(isChanged => {
        this.isChanged = isChanged;
      });

    this.form = this.createForm();
  }

  createForm() {
    let form = this._builder.group({
      name: [this.establishment.name || '', [Validators.required]],
      description: [this.establishment.description || '', [Validators.required]],
    });

    return form;
  }

  filesUploaded(file: File): void {
    if (!file[0].type.includes('image/')) {
      this._dialogService.showSnackBar('Файл повинен бути типу .jpg, .png');
      return;
    }

    this._dialogService.showConfirmationDialog("Для того, щоб якість картинки була найкращою, ми рекомендуємо вам завантажувати фото розширення 1040х200.",
      result => {

        this.file = file[0];

        let formData = new FormData();
        formData.append('Image', this.file);

        this._establishmentsService.onEditEstablishmentImage.next({ id: this.establishment.id, model: formData });
      });
  }

  updatePhoto(): void {
    if (this.file == null) {
      this._dialogService.showConfirmationDialog("Якщо ви не виберете файл, фото закладу буде стандартним",
        result => {
          if (result)
            this._establishmentsService.onDeleteEstablishmentImage.next(null);
        });

      return;
    }

    let formData = new FormData();
    formData.append('Image', this.file);

    this._establishmentsService.onEditEstablishmentImage.next({ id: this.establishment.id, model: formData });
  }

  editEstablishment(): void {
    if (!this.form.valid) {
      this._dialogService.showSnackBar("Перевірте форму будь-ласка");
      this.touchForm(this.form);
      return;
    }

    let request = new EditEstablishmentRequestModel({
      name: this.form.value.name,
      description: this.form.value.description,
    });

    this._establishmentsService.onEditEstablishment.next({ id: this.establishment.id, model: request });
  }

  deletePhoto(): void {
    this._establishmentsService.onDeleteEstablishmentImage.next(this.establishment.id);
    this.file = null;
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
