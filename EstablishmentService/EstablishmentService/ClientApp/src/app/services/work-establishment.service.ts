import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EstablishmentModel } from '../models/establishment/establishment.model';
import { APIEstablishmentService } from './api/api-establishment.service';
import { APIWorkEstablishmentService } from './api/api-work-establishment.service';
import { DialogService } from './dialog.service';

@Injectable()
export class WorkEstablishmentService {

  onGetWorkEstablishments: Subject<any>;

  onWorkEstablishmentsChanged: BehaviorSubject<EstablishmentModel[]>

  constructor(
    private _apiService: APIWorkEstablishmentService,
    private _dialogService: DialogService,
  ) {
    this.onGetWorkEstablishments = new Subject();

    this.onWorkEstablishmentsChanged = new BehaviorSubject([]);

    this.onGetWorkEstablishments.subscribe(request => this.getWorkEstablishments());
  }

  private async getWorkEstablishments() {
    let response = await this._apiService.getWorkEstablishments();

    if (response.success) {
      this.onWorkEstablishmentsChanged.next(response.model);
    }
  }
}
