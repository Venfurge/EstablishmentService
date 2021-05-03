import { OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { UserModel } from '../../../../models/user/user.model';
import { DialogService } from '../../../../services/dialog.service';
import { WorkerInvitationComponent } from './worker-invitation/worker-invitation.component';
import { EstablishmentWorkerService } from '../../../../services/establishment/establishment-worker.service';

@Component({
    selector: 'workers',
    templateUrl: './workers.component.html',
    styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit, OnDestroy {

  workers: UserModel[];
  establishmentId: number;

  private _unsubscribe: Subject<any>;

  constructor(
    public dialog: MatDialog,
    private _workerService: EstablishmentWorkerService,
    private _dialogService: DialogService,
    public dialogRef: MatDialogRef<WorkersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.establishmentId = data.establishmentId;

    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this._workerService.onWorkersChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(workers => {

        if (workers != null) {
          this.workers = workers;
        }
      });
  }

  addWorker() {
    let dialogRef = this.dialog.open(WorkerInvitationComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '600px',
      data: {
        establishmentId: this.establishmentId,
      },
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
