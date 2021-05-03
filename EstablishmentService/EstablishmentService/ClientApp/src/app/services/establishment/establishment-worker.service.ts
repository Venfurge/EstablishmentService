import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserModel } from '../../models/user/user.model';
import { GetWorkersRequestModel } from '../../models/workers/get-workers-request.model';
import { APIEstablishmentWorkerService } from '../api/api-establishment/api-establishment-worker.service';
import { AuthService } from '../auth.service';
import { DialogService } from '../dialog.service';
import { ProfileService } from '../profile.service';
import { WorkEstablishmentService } from './work-establishment.service';

@Injectable()
export class EstablishmentWorkerService {

  onGetWorkers: Subject<GetWorkersRequestModel>;
  onGetInvite: Subject<number>;
  onEditWorkerRequest: Subject<GetWorkersRequestModel>;
  onAcceptInvite: Subject<string>;
  onCleanInvite: Subject<any>;
  onDeleteMeFromEstablishment: Subject<number>;

  //1 - establishmentId 2 - workerId
  onDeleteWorkerFromEstablishment: Subject<[number, number]>;

  onWorkersChanged: BehaviorSubject<UserModel[]>;
  onInviteChanged: BehaviorSubject<string>;
  onGetWorkersRequestChanged: BehaviorSubject<GetWorkersRequestModel>;

  request: GetWorkersRequestModel;

  constructor(
    private _apiService: APIEstablishmentWorkerService,
    private _workEstablishmentService: WorkEstablishmentService,
    private _authService: AuthService,
    private _profileService: ProfileService,
    private _dialogService: DialogService,
  ) {
    this.request = null;

    this.onGetWorkers = new Subject();
    this.onGetInvite = new Subject();
    this.onEditWorkerRequest = new Subject();
    this.onAcceptInvite = new Subject();
    this.onCleanInvite = new Subject();
    this.onDeleteMeFromEstablishment = new Subject();
    this.onDeleteWorkerFromEstablishment = new Subject();

    this.onWorkersChanged = new BehaviorSubject([]);
    this.onInviteChanged = new BehaviorSubject(null);
    this.onGetWorkersRequestChanged = new BehaviorSubject(null);

    this.onGetWorkers.subscribe(request => this.getWorkers(request));
    this.onGetInvite.subscribe(request => this.getInvite(request));
    this.onEditWorkerRequest.subscribe(request => this.editWorkerRequest(request))
    this.onAcceptInvite.subscribe(request => this.acceptInvite(request));
    this.onCleanInvite.subscribe(request => this.cleanInvite());
    this.onDeleteMeFromEstablishment.subscribe(request => this.deleteMeFromEstablishment(request));
    this.onDeleteWorkerFromEstablishment.subscribe(request => this.deleteWorkerFromEstablishment(request));
  }

  private async getWorkers(request: GetWorkersRequestModel) {
    let response = await this._apiService.getWorkers(request);

    if (response.success) {
      this.onWorkersChanged.next(response.model);
    }
  }

  private async getInvite(request: number) {
    let response = await this._apiService.getInvite(request);

    if (response.success) {
      this.onInviteChanged.next(response.model);
      this._dialogService.showSnackBar('Запрошення успішно створено!');
      return;
    }

    switch (response.status) {
      case 404:
        this._dialogService.showSnackBar('Заклад не знайдено!');
        break;
    }
  }

  private async cleanInvite() {
    this.onInviteChanged.next(null);
  }

  private async editWorkerRequest(request: GetWorkersRequestModel) {
    this.request = request;
    this.onGetWorkersRequestChanged.next(this.request);
  }

  private async acceptInvite(request: string) {
    let response = await this._apiService.acceptInvite(request);

    if (response.success) {
      if (response.model.isAccepted) {
        this._authService.onTokenChanged.next(response.model.token);
        this._profileService.onGetProfile.next(null);
        this._dialogService.showSnackBar('Успішно!');
        return response;
      }

      this._dialogService.showSnackBar('Ви не можете бути додані у цей заклад!');
      return response;
    }

    switch (response.status) {
      case 400:
        this._dialogService.showSnackBar('Запрошення не дійсне!');
        break;
      case 404:
        this._dialogService.showSnackBar('Заклад не знайдено!');
        break;
    }
  }

  private async deleteMeFromEstablishment(request: number) {
    let response = await this._apiService.deleteMeFromEstablishment(request);

    if (response.success) {
      if (response.model.isChanged) {
        this._authService.onTokenChanged.next(response.model.token);
        this._profileService.onGetProfile.next(null);
        this._dialogService.showSnackBar('Успішно видалено!')
        return response;
      }
    }

    switch (response.status) {
      case 404:
        this._dialogService.showSnackBar('Заклад не знайдено');
        break;
    }
  }

  private async deleteWorkerFromEstablishment(request: [number, number]) {
    let response = await this._apiService.deleteWorkerFromEstablishment(request[0], request[1]);

    if (response.success) {
      this.getWorkers({ establishmentId: request[0], find: null });
      this._dialogService.showSnackBar('Успішно видалено!')
    }

    switch (response.status) {
      case 400:
        this._dialogService.showSnackBar('Немає доступу');
        break;
      case 404:
        this._dialogService.showSnackBar('Заклад не знайдено');
        break;
    }
  }
}
