import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserModel } from '../../../../../models/user/user.model';
import { GetWorkersRequestModel } from '../../../../../models/workers/get-workers-request.model';
import { DialogService } from '../../../../../services/dialog.service';
import { EstablishmentWorkerService } from '../../../../../services/establishment-worker.service';

@Component({
  selector: 'workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit, OnDestroy {

  @Input() establishmentId: number;

  public workerList: UserModel[] = [];
  public request: GetWorkersRequestModel = null;

  private _unsubscribe: Subject<any>;

  constructor(
    private _workerService: EstablishmentWorkerService,
    private _dialogService: DialogService,
  ) {
    this._unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this._workerService.onWorkersChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(workers => {
        this.workerList = workers;
      });

    this._workerService.onGetWorkersRequestChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(request => {
        if (request != null) {
          this.request = request;
          this._workerService.onGetWorkers.next(request);
          return;
        }

        this._workerService.onEditWorkerRequest.next({ establishmentId: this.establishmentId, find: null });
      });
  }

  removeWorker(workerId: number) {
    this._dialogService.showConfirmationDialog(result => {
        if (result) {
          this._workerService.onDeleteWorkerFromEstablishment.next([this.establishmentId, workerId]);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
