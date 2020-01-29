import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldvalidationComponent } from './fieldvalidation.component';

describe('FieldvalidationComponent', () => {
  let component: FieldvalidationComponent;
  let fixture: ComponentFixture<FieldvalidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldvalidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
