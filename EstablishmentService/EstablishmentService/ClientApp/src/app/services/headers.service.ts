import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class HeadersService {
  headers: HttpHeaders;

  onHeadersChanged: BehaviorSubject<HttpHeaders>;

  constructor() {
    this.headers = new HttpHeaders().append('Authorization', `bearer ${localStorage.getItem('token')}`);

    this.onHeadersChanged = new BehaviorSubject<HttpHeaders>(this.headers);
  }

  tokenChanged(token: string): void {
    this.headers = this.headers.delete('Authorization');
    this.headers = this.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);
    this.onHeadersChanged.next(this.headers);
  }
}
