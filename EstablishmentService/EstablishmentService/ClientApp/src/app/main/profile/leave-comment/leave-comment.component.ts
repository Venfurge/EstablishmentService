import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommentInvitationService } from '../../../services/comment/comment-invitation.service';
import { DialogService } from '../../../services/dialog.service';
import { CommentInvitationComponent } from './comment-invitation/comment-invitation.component';

@Component({
  selector: 'leave-comment',
  templateUrl: './leave-comment.component.html',
  styleUrls: ['./leave-comment.component.scss']
})
export class LeaveCommentComponent implements OnInit, OnDestroy {
  establishmentId: number;

  private _checkedIds: number[] = [];
  private _unsubscribe: Subject<any>;

  constructor(
    private _commentInvitationService: CommentInvitationService,
    private _dialogService: DialogService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LeaveCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.establishmentId = data.establishmentId;
    this._unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this._commentInvitationService.onCheckedMealsIdsChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(ids => {
        this._checkedIds = ids;
      });
  }

  createCommentInvitation() {
    if (this._checkedIds.length == 0) {
      this._dialogService.showSnackBar("Страв не вибрано");
      return;
    }

    let dialogRef = this.dialog.open(CommentInvitationComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '600px',
    });
  }

  close(): void {
    this._commentInvitationService.onCleanCheckedMeals.next(null);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
