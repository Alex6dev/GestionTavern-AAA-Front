import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableRestModel } from 'src/app/interfaces/table-rest';

@Injectable({
  providedIn: 'root',
})
export class TableRestService {
  private tables = new BehaviorSubject<TableRestModel[]>(
    [] as TableRestModel[]
  );
  tables$ = this.tables.asObservable();

  constructor() {}

  setTables(newTables: TableRestModel[]): void {
    this.tables.next(newTables);
  }

  updateTable(tableBefore: TableRestModel, tableAfter: TableRestModel): void {
    let newTables: TableRestModel[] = Array.from(this.tables.getValue());
    const index = newTables.findIndex((element) => (element === tableBefore));
    newTables[index] = tableAfter;
    this.setTables(newTables);
  }
}
