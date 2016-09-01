/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { BeeComponent } from './bee.component';

describe('Component: Bee', () => {
  it('should create an instance', () => {
    let component = new BeeComponent();
    expect(component).toBeTruthy();
  });
});
