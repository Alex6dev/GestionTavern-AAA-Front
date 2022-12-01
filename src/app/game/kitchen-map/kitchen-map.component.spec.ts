import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenMapComponent } from './kitchen-map.component';

describe('KitchenMapComponent', () => {
  let component: KitchenMapComponent;
  let fixture: ComponentFixture<KitchenMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KitchenMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KitchenMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
