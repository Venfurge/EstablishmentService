import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EstablishmentModel } from '../../../../models/establishment/establishment.model';
import { EstablishmentService } from '../../../../services/establishment/establishment.service';
import { MealsTabService } from '../../../../services/meal/meals-tab.service';
import { LeaveCommentComponent } from '../../leave-comment/leave-comment.component';
import { WorkersComponent } from '../workers/workers.component';
import { EditEstablishmentComponent } from './edit-establishment/edit-establishment.component';

@Component({
  selector: 'establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.scss']
})
export class EstablishmentsComponent implements OnInit, OnDestroy {

  establishments: EstablishmentModel[] = [];

  private _unsubscribe: Subject<any>;

  constructor(
    public dialog: MatDialog,
    private _mealTabService: MealsTabService,
    private _establishmentsService: EstablishmentService,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this._establishmentsService.onEstablishmentsChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(request => {
        this.establishments = request;
      });

    this._establishmentsService.onGetEstablishments.next(null);
  }

  openMenu(establishmentId: number) {
    this._mealTabService.onEditMealTabIndex.next(establishmentId);
  }

  changeEstablishment(establishment: EstablishmentModel): void {
    let dialogRef = this.dialog.open(EditEstablishmentComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '600px',
      data: {
        establishment: establishment,
      },
    });
  }

  leaveComment(id: number) {
    let dialogRef = this.dialog.open(LeaveCommentComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '600px',
      data: {
        establishmentId: id,
      },
    });
  }

  editWorkers(establishmentId: number) {
    let dialogRef = this.dialog.open(WorkersComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '600px',
      data: {
        establishmentId: establishmentId,
      },
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
