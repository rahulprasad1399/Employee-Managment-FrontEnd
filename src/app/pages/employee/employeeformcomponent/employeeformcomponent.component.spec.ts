import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeformcomponentComponent } from './employeeformcomponent.component';

describe('EmployeeformcomponentComponent', () => {
  let component: EmployeeformcomponentComponent;
  let fixture: ComponentFixture<EmployeeformcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeformcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeformcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
