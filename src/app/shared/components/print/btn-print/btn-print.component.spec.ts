import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPrintComponent } from './btn-print.component';

describe('BtnPrintComponent', () => {
  let component: BtnPrintComponent;
  let fixture: ComponentFixture<BtnPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
