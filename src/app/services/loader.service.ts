import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly loaderSubject = new Subject<boolean>();

  public loaderStateChanged = this.loaderSubject.asObservable();

  show() {
      this.loaderSubject.next(true);
  }

  hide() {
      this.loaderSubject.next(false);
  }
}
