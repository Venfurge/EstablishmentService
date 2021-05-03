import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { CommentInvitationService } from '../../../../services/comment/comment-invitation.service';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'comment-invitation',
  templateUrl: './comment-invitation.component.html',
  styleUrls: ['./comment-invitation.component.scss']
})
export class CommentInvitationComponent implements OnInit, OnDestroy {

  invitationToken: string;
  invitationLink: string;

  private _checkedIds: number[] = [];
  private _unsubscribe: Subject<any>;

  constructor(
    private _commentInvitationService: CommentInvitationService,
    private _dialogService: DialogService,
    private _clipboard: Clipboard,
    public dialogRef: MatDialogRef<CommentInvitationComponent>,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this._commentInvitationService.onCheckedMealsIdsChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(ids => {
        this._checkedIds = ids;
      });

    this._commentInvitationService.onInviteChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(token => {
        this.invitationToken = token;
        this.setInvitationLink();
      });

    this._commentInvitationService.onCreateInvite.next(this._checkedIds);
  }

  setInvitationLink(): void {
    this.invitationLink = null;

    if (this.invitationToken != null) {
      this.invitationLink = environment.url + "leave-comment/" + this.invitationToken;
    }
  }

  copyUrlToClipboard(): void {
    this._clipboard.copy(this.invitationLink);
    this._dialogService.showSnackBar('Спокійовано');
  }

  close(): void {
    this._commentInvitationService.onCleanInvite.next(null);
    this._commentInvitationService.onCleanCheckedMeals.next(null);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
