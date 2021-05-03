import { OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogService } from '../../../../../services/dialog.service';
import { environment } from '../../../../../../environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';
import { EstablishmentWorkerService } from '../../../../../services/establishment/establishment-worker.service';

@Component({
  selector: 'worker-invitation',
  templateUrl: './worker-invitation.component.html',
  styleUrls: ['./worker-invitation.component.scss']
})
export class WorkerInvitationComponent implements OnInit, OnDestroy {

  invitationToken: string;
  invitationLink: string;
  establishmentId: number;

  private _unsubscribe: Subject<any>;

  constructor(
    private _workerService: EstablishmentWorkerService,
    private _dialogService: DialogService,
    private _clipboard: Clipboard,
    public dialogRef: MatDialogRef<WorkerInvitationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.establishmentId = data.establishmentId;

    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this._workerService.onInviteChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(token => {
        this.invitationToken = token;
        this.setInvitationLink();
      });

    this._workerService.onGetInvite.next(this.establishmentId);
  }

  setInvitationLink(): void {
    this.invitationLink = null;

    if (this.invitationToken != null) {
      this.invitationLink = environment.url + "invite-accept/" + this.invitationToken;
    }
  }

  copyUrlToClipboard(): void {
    this._clipboard.copy(this.invitationLink);
    this._dialogService.showSnackBar('Спокійовано');
  }

  close(): void {
    this._workerService.onCleanInvite.next(null);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
