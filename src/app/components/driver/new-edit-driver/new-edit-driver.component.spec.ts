import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditDriverComponent } from './new-edit-driver.component';

describe('NewEditDriverComponent', () => {
  let component: NewEditDriverComponent;
  let fixture: ComponentFixture<NewEditDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
