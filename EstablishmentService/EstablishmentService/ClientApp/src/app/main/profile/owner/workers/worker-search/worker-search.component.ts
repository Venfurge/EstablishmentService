import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetWorkersRequestModel } from '../../../../../models/workers/get-workers-request.model';
import { EstablishmentWorkerService } from '../../../../../services/establishment/establishment-worker.service';

@Component({
  selector: 'worker-search',
  templateUrl: './worker-search.component.html',
  styleUrls: ['./worker-search.component.scss']
})
export class WorkerSearchComponent implements OnInit, OnDestroy {

  @Input() establishmentId: number;

  request: GetWorkersRequestModel;
  form: FormGroup;

  private _unsubscribe: Subject<any>;

  constructor(
    private _workerService: EstablishmentWorkerService,
    private _builder: FormBuilder,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
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

    this.form = this.createForm();
  }

  createForm(): FormGroup {
    let form = this._builder.group({
      find: [this.request.find || ''],
    });

    return form;
  }

  search() {
    this.request.find = this.form.value.find;
    this._workerService.onEditWorkerRequest.next(this.request);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
