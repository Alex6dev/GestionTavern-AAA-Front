import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManagerFormComponent } from './add-manager-form.component';

describe('AddManagerFormComponent', () => {
  let component: AddManagerFormComponent;
  let fixture: ComponentFixture<AddManagerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManagerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
