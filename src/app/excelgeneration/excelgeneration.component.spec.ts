import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelgenerationComponent } from './excelgeneration.component';

describe('ExcelgenerationComponent', () => {
  let component: ExcelgenerationComponent;
  let fixture: ComponentFixture<ExcelgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
