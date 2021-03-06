import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EditEstablishmentRequestModel } from '../../models/establishment/edit-establishment-request.model';
import { EstablishmentModel } from '../../models/establishment/establishment.model';
import { IdModelRequest } from '../../models/id-model-request.model';
import { APIEstablishmentService } from '../api/api-establishment/api-establishment.service';
import { DialogService } from '../dialog.service';

@Injectable()
export class EstablishmentService {

  onGetEstablishments: Subject<any>;
  onEditEstablishment: Subject<IdModelRequest<EditEstablishmentRequestModel>>;
  onEditEstablishmentImage: Subject<IdModelRequest<FormData>>;
  onDeleteEstablishmentImage: Subject<number>;

  onEstablishmentsChanged: BehaviorSubject<EstablishmentModel[]>
  onEstablishmentChanged: BehaviorSubject<EstablishmentModel>
  onChangeEstablishmentImage: BehaviorSubject<boolean>;

  constructor(
    private _apiService: APIEstablishmentService,
    private _dialogService: DialogService,
  ) {
    this.onGetEstablishments = new Subject();
    this.onEditEstablishment = new Subject();
    this.onEditEstablishmentImage = new Subject();
    this.onDeleteEstablishmentImage = new Subject();

    this.onEstablishmentsChanged = new BehaviorSubject([]);
    this.onEstablishmentChanged = new BehaviorSubject(null);
    this.onChangeEstablishmentImage = new BehaviorSubject(false);

    this.onGetEstablishments.subscribe(request => this.getEstablishments());
    this.onEditEstablishment.subscribe(request => this.editEstablishment(request));
    this.onEditEstablishmentImage.subscribe(request => this.editEstablishmentImage(request));
    this.onDeleteEstablishmentImage.subscribe(request => this.deleteEstablishmentImage(request));
  }

  private async getEstablishments() {
    let response = await this._apiService.getEstablishments();

    if (response.success) {
      this.onEstablishmentsChanged.next(response.model);
    }
  }

  private async editEstablishment(request: IdModelRequest<EditEstablishmentRequestModel>) {
    let response = await this._apiService.editEstablishment(request);

    if (response.success) {
      this.onEstablishmentChanged.next(response.model);
      this.getEstablishments();
      this._dialogService.showSnackBar('?????????????? ??????????????!');
      return;
    }

    switch (response.status) {
      case 404:
        this._dialogService.showSnackBar('???????????? ???? ????????????????!');
        break;
    }
  }

  private async editEstablishmentImage(request: IdModelRequest<FormData>) {
    this.onChangeEstablishmentImage.next(true);
    let response = await this._apiService.editEstablishmentImage(request);

    if (response.success) {
      this.onEstablishmentChanged.next(response.model);
      this.getEstablishments();
      this.onChangeEstablishmentImage.next(false);
      this._dialogService.showSnackBar('?????????????? ??????????????!');
      return response;
    }

    switch (response.status) {
      case 400:
        this.onChangeEstablishmentImage.next(false);
        this._dialogService.showSnackBar('???????????????? ????????!');
        break;
      case 404:
        this.onChangeEstablishmentImage.next(false);
        this._dialogService.showSnackBar('?????????? ???????????? ?????????????? ?????? ????????????????');
        break;
    }
  }

  private async deleteEstablishmentImage(request: number) {
    let response = await this._apiService.deleteEstablishmentImage(request);

    if (response.success) {
      this.onEstablishmentChanged.next(response.model);
      this.getEstablishments();
      this._dialogService.showSnackBar('?????????????? ????????????????!')
    }

    switch (response.status) {
      case 400:
        this._dialogService.showSnackBar('???????? ???? ??????????????!');
        break;
      case 404:
        this._dialogService.showSnackBar('?????????? ???????????? ?????????????? ?????? ????????????????');
        break;
    }
  }
}
