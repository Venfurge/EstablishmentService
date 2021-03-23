import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserModel } from '../../../models/user/user.model';
import { DialogService } from '../../../services/dialog.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.scss']
})
export class ChangeProfileImageComponent implements OnInit, OnDestroy {

  file: File = null;
  userProfile: UserModel;

  isFileOver: boolean = false;
  isChanged: boolean = false;

  private _unsubscribe: Subject<any>;

  constructor(
    private _profileService: ProfileService,
    private _dialogService: DialogService,
    public dialogRef: MatDialogRef<ChangeProfileImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.userProfile = data.userProfile;

    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this._profileService.onUserChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(profile => {
        if(profile != null)
          this.userProfile = profile;
      });

    this._profileService.onChangeProfileImage
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(isChanged => {
        this.isChanged = isChanged;
      });
  }

  filesUploaded(file: File): void {
    if (!file[0].type.includes('image/')) {
      this._dialogService.showSnackBar('Файл повинен бути типу .jpg, .png');
      return;
    }

    this.file = file[0];

    let formData = new FormData();
    formData.append('Image', this.file);

    this._profileService.onEditProfileImage.next({ id: null, model: formData });
  }

  updateProfilePhoto(): void {
    if (this.file == null) {
      this._dialogService.showConfirmationDialog("Якщо ви не виберете файл, фото профілю буде стандартним",
        result => {
          if (result)
            this._profileService.onDeleteProfileImage.next(null);
        });

      return;
    }

    let formData = new FormData();
    formData.append('Image', this.file);

    this._profileService.onEditProfileImage.next({ id: null, model: formData });
  }

  deleteProfilePhoto(): void {

    this._profileService.onDeleteProfileImage.next(null);
    this.file = null;
    this._dialogService.showSnackBar('Фото видалено');
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
