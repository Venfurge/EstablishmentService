import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EstablishmentModel } from '../../../models/establishment/establishment.model';
import { DialogService } from '../../../services/dialog.service';
import { EstablishmentWorkerService } from '../../../services/establishment-worker.service';
import { WorkEstablishmentService } from '../../../services/work-establishment.service';

@Component({
    selector: 'work-establishments',
    templateUrl: './work-establishments.component.html',
    styleUrls: ['./work-establishments.component.scss']
})
export class WorkEstablishmentsComponent implements OnInit, OnDestroy {

  workEstablishments: EstablishmentModel[] = [];

  private _unsubscribe: Subject<any>;

  constructor(
    public dialog: MatDialog,
    private _dialogService: DialogService,
    private _establishmentWorkerService: EstablishmentWorkerService,
    private _workEstablishmentService: WorkEstablishmentService,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this._workEstablishmentService.onWorkEstablishmentsChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(request => {
        this.workEstablishments = request;
      });

    this._workEstablishmentService.onGetWorkEstablishments.next(null);
  }

  leaveEstablishment(id: number) {
    this._dialogService.showConfirmationDialog(result => {
      if (result) {
        this._establishmentWorkerService.onDeleteMeFromEstablishment.next(id);
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
