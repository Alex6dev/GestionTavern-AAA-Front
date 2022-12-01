import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaceModel } from 'src/app/interfaces/place';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private places = new BehaviorSubject<PlaceModel[]>([] as PlaceModel[]);
  places$ = this.places.asObservable();

  constructor() {}
  setPlaces(newPlaces: PlaceModel[]) {
    this.places.next(newPlaces);
  }
}
