/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ChildWatchService } from './child-watch.service';

describe('Service: ChildWatch', () => {
  beforeEach(() => {
    addProviders([ChildWatchService]);
  });

  it('should ...',
    inject([ChildWatchService],
      (service: ChildWatchService) => {
        expect(service).toBeTruthy();
      }));
});
