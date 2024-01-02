/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VotoComponent } from './voto.component';

describe('VotoComponent', () => {
  let component: VotoComponent;
  let fixture: ComponentFixture<VotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
