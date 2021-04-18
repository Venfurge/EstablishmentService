import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { EstablishmentWorkerService } from '../../services/establishment-worker.service';

@Component({
  selector: 'invite-accept',
  templateUrl: './invite-accept.component.html',
  styleUrls: ['./invite-accept.component.scss']
})
export class InviteAcceptComponent implements OnInit, OnDestroy  {
  public inviteToken: string;

  private _unsubscribe: Subject<any>;

  constructor(
    private _workerService: EstablishmentWorkerService,
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


    this._dialogService.showConfirmationDialog("Прийняти запрошення?",
      result => {
        if (result) {
          this._workerService.onAcceptInvite.next(this.inviteToken);
          return;
        }

        this._dialogService.showSnackBar("Запрошення відхилено");
      });

    this._router.navigateByUrl('/profile');
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
