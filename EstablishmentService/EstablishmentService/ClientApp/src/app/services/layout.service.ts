import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { NavigationLink } from '../models/layout/navigation-link.model';
import { ProfileService } from './profile.service';

@Injectable()
export class LayoutService {

  public onAddNavigationLink: Subject<NavigationLink>;
  public onAddProfileLink: Subject<NavigationLink>;
  public onRemoveNavigationLink: Subject<string>;
  public onRemoveProfileLink: Subject<string>;
  public onSetProfileLinks: Subject<NavigationLink[]>;

  public onGetNavigationLinkChanged: BehaviorSubject<NavigationLink[]>;
  public onGetProfileLinkChanged: BehaviorSubject<NavigationLink[]>;

  //#region Header links

  private navigationLinks: NavigationLink[] = [

  ];

  //#endregion

  //#region Profile links

  private profileLinks: NavigationLink[] = [];

  private unauthorizedProfileLinks: NavigationLink[] = [
    {
      id: 'singIn',
      linkName: 'Sign In',
      linkUrl: '/reg',
      icon: 'person_add',
    },
    {
      id: 'logIn',
      linkName: 'Log In',
      linkUrl: '/login',
      icon: 'login',
    },
  ];

  private authorizedProfileLinks: NavigationLink[] = [
    {
      id: 'profile',
      linkName: 'Profile',
      linkUrl: '/profile',
      icon: 'portrait',
    },
  ];

  //#endregion

  constructor(
    private _profileService: ProfileService,
  ) {
    this.onAddNavigationLink = new Subject();
    this.onAddProfileLink = new Subject();
    this.onRemoveNavigationLink = new Subject();
    this.onRemoveProfileLink = new Subject();
    this.onSetProfileLinks = new Subject();

    this.onGetNavigationLinkChanged = new BehaviorSubject<NavigationLink[]>(this.navigationLinks);
    this.onGetProfileLinkChanged = new BehaviorSubject<NavigationLink[]>(this.profileLinks);

    this.onAddNavigationLink.subscribe(link => {
      if (link != null) {
        this.navigationLinks.push(link);
        this.onGetNavigationLinkChanged.next(this.navigationLinks);
      }
    });

    this.onAddProfileLink.subscribe(link => {
      if (link != null) {
        this.profileLinks.push(link);
        this.onGetProfileLinkChanged.next(this.profileLinks);
      }
    });

    this.onRemoveNavigationLink.subscribe(id => {
      if (id != null) {
        this.navigationLinks = this.navigationLinks.filter(v => v.id !== id);
        this.onGetNavigationLinkChanged.next(this.navigationLinks);
      }
    });

    this.onRemoveProfileLink.subscribe(id => {
      if (id != null) {
        this.profileLinks = this.profileLinks.filter(v => v.id !== id);
        this.onGetProfileLinkChanged.next(this.profileLinks);
      }
    });

    this.onSetProfileLinks.subscribe(links => {
      if (links != null) {
        this.profileLinks = links;
        this.onGetProfileLinkChanged.next(this.profileLinks);
      }
    });

    this._profileService.onUserChanged.subscribe(user => {
      if (user != null)
        this.onSetProfileLinks.next(this.authorizedProfileLinks);
      else
        this.onSetProfileLinks.next(this.unauthorizedProfileLinks);
    });
  }

  //#region "Edit NavigationLinks add/remove  methods"

  //Add Navigation Link
  public addLink(data: NavigationLink): void {
    this.onAddNavigationLink.next(data);
  }

  //remove Link
  public removeLink(id: string): void {
    this.onRemoveNavigationLink.next(id);
  }

  //#endregion "Edit NavigationLinks add/remove  methods"

  //#region "Edit ProfileLinks add/remove  methods"

  //Add Profile Link
  public addProfileLink(data: NavigationLink): void {
    this.onAddProfileLink.next(data);
  }

  //Remove Profile Link
  public removeProfileLink(id: string): void {
    this.onRemoveProfileLink.next(id);
  }

  //Set Profile Links
  public setProfileLinks(links: NavigationLink[]): void {
    this.onSetProfileLinks.next(links);
  }

  //#endregion "Edit ProfileLinks add/remove  methods"
}
