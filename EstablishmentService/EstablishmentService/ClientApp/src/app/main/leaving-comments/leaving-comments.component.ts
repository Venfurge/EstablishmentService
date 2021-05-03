import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddMealCommentRequest } from '../../models/comment/add-meal-comment-request.model';
import { MealModel } from '../../models/meal/meal.model';
import { CommentInvitationService } from '../../services/comment/comment-invitation.service';
import { CommentService } from '../../services/comment/comment.service';
import { DialogService } from '../../services/dialog.service';

@Component({
    selector: 'leaving-comments',
    templateUrl: './leaving-comments.component.html',
    styleUrls: ['./leaving-comments.component.scss']
})
export class LeavingCommentsComponent implements OnInit, OnDestroy {
  public inviteToken: string;
  public isInviteAlive: boolean = true;
  public mealsForComment: MealModel[] = null;

  private _unsubscribe: Subject<any>;

  constructor(
    private _commentInvitationService: CommentInvitationService,
    private _commentService: CommentService,
    private _dialogService: DialogService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this._unsubscribe = new Subject<any>();

    if (!localStorage.getItem('token'))
      this._router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    let routeMap = this._route.snapshot.paramMap;
    this.inviteToken = String(routeMap.get('token'));

    this._commentInvitationService.onInviteIsAlive
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(isInviteAlive => {
        if (!isInviteAlive) {
          this._dialogService.showAlertDialog("Код запрошення не дійсний, спробуйте ще раз");
          this._router.navigateByUrl('/');
        }
      });

    this._commentInvitationService.onMealsForComment
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(mealsForComment => {
        this.mealsForComment = mealsForComment;
      });

    this._commentService.onMealsCommented
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(isCommented => {
        if (isCommented) {
          this._commentService.onMealsCommented.next(false);
          this._router.navigateByUrl('/');
        }
      });

    this._commentInvitationService.onAcceptInvite.next(this.inviteToken);
  }

  leaveComment(): void {
    let inputs = document.getElementsByTagName('textarea');
    let request: AddMealCommentRequest[] = [];

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value) {
        request.push({ mealId: this.mealsForComment[i].id, comment: inputs[i].value });
      }
    }

    if (request.length) {
      this._commentService.onSetMealsComments.next(request);
      return;
    }

    this._dialogService.showSnackBar('Прокометуйте, хоча б одну страву');
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
