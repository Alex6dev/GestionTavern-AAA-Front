import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerraceMapComponent } from './terrace-map.component';

describe('TerraceMapComponent', () => {
  let component: TerraceMapComponent;
  let fixture: ComponentFixture<TerraceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerraceMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerraceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
