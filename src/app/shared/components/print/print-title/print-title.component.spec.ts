import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTitleComponent } from './print-title.component';

describe('PrintTitleComponent', () => {
  let component: PrintTitleComponent;
  let fixture: ComponentFixture<PrintTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
