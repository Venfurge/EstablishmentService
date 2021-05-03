import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    AlertDialogComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,

    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
})
export class DialogModule { }
