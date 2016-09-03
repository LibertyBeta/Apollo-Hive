import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ChildWatchService {
  private kinderWatchers:any = {};
  constructor() { }

  registerParent(component:string){
    let parentSubject = new Subject();
    this.kinderWatchers[component] = parentSubject;
    return this.kinderWatchers[component].asObservable();
  }

  sendToParent(component:string, value:any){
    this.kinderWatchers[component].next(value);
  }



}
