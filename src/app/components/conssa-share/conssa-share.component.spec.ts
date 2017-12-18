import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConssaShareComponent } from './conssa-share.component';

describe('ConssaShareComponent', () => {
  let component: ConssaShareComponent;
  let fixture: ComponentFixture<ConssaShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConssaShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConssaShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
