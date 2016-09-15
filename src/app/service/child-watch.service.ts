import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ChildWatchService {
  private kinderWatchers: Object{};
  constructor() { }

  registerParent(component:any){
    let parentSubject:Subject = new Subject();
    kinderWatchers[component] = parentSubject;

  }



}
