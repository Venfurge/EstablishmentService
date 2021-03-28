import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EstablishmentModel } from '../../../../models/establishment/establishment.model';
import { EstablishmentService } from '../../../../services/establishment.service';
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

  changeEstablishment(establishment: EstablishmentModel): void {
    let dialogRef = this.dialog.open(EditEstablishmentComponent, {
      panelClass: 'dialog-container-zero-padding',
      width: '600px',
      data: {
        establishment: establishment,
      },
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
