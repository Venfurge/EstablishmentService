import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { LayoutService } from '../../services/layout.service';
import { Subject } from 'rxjs';
import { NavigationLink } from '../../models/layout/navigation-link.model';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isDeviceSm: boolean;
  public isDeviceXs: boolean;
  public isAuthorized: boolean;

  public navigationLinks: NavigationLink[];
  public profileLinks: NavigationLink[];

  private _unsubscribe: Subject<any>;

  constructor(
    public mediaObserver: MediaObserver,

    private _layoutService: LayoutService,
    private _profileService: ProfileService,
  ) {
    this._unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    this.mediaObserver.media$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(res => {
        this.isDeviceSm = res.mqAlias === "sm" || res.mqAlias === "xs";
        this.isDeviceXs = res.mqAlias === "xs";
      });

    this._layoutService.onGetNavigationLinkChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(links => {
        this.navigationLinks = links;
      });

    this._layoutService.onGetProfileLinkChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(links => {
        this.profileLinks = links;
      });

    this._profileService.onUserChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(user => {
        if (user != null)
          this.isAuthorized = true;
        else
          this.isAuthorized = false;
      });
  }

  private onLogOut(): void {
    this._profileService.onLogout.next(null);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
