import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/interfaces/customer';
import { PlaceModel } from 'src/app/interfaces/place';
import { TableRest, TableRestModel } from 'src/app/interfaces/table-rest';

@Component({
  selector: 'app-terrace-map',
  templateUrl: './terrace-map.component.html',
  styleUrls: ['./terrace-map.component.css'],
})
export class TerraceMapComponent implements OnInit {
  places: PlaceModel[] = [
   
  ];
  customers: CustomerModel[] = [
   
  ];
  tableRests: TableRestModel[] = [
    
  ];

  tableRestWithCustomer: TableRest[] = [];
  newCustomers: CustomerModel[] = [];
  customerIndexSelected: number = 0;
  tableIndexSelected: number = 0;

  constructor() {}

  ngOnInit(): void {
    let customerTempo = {} as CustomerModel;
    let placeTempo = {} as PlaceModel;

    placeTempo = this.places.find((element) => element.type == 2)!;

    this.tableRests.forEach((table) => {
      if (table.idPlace == placeTempo.id) {
        this.tableRestWithCustomer.push(table);
      }
    });

    this.tableRestWithCustomer.forEach((table) => {
      table.customers = [];
      this.customers.forEach((customer) => {
        customerTempo = customer;
        if (customerTempo.idTableRest == table.id) {
          customerTempo.numImg = Math.floor(Math.random() * 7) + 1;
          table.customers?.push(customer);
        }
      });
    });

    this.customers.forEach((customer) => {
      if (customer.idTableRest == undefined || customer.idTableRest < 1) {
        this.newCustomers.push(customerTempo);
      }
    });
  }

  assignTable() {
    let assignPossible = false;
    if (
      this.tableRestWithCustomer[this.tableIndexSelected].customers != undefined
    ) {
      if (
        this.tableRestWithCustomer[this.tableIndexSelected].customers
          ?.length! >=
        this.tableRestWithCustomer[this.tableIndexSelected].numberPlace
      ) {
      } else {
        assignPossible = true;
      }
    } else {
      assignPossible = true;
    }

    if (assignPossible) {
      this.newCustomers[this.customerIndexSelected].numImg =
        Math.floor(Math.random() * 7) + 1;
      this.tableRestWithCustomer[this.tableIndexSelected].customers?.push(
        this.newCustomers[this.customerIndexSelected]
      );
      this.newCustomers.splice(this.customerIndexSelected, 1);
    }
  }

  customerChange(event: Event): void {
    if (event.target instanceof HTMLSelectElement && event.target.value != '') {
      this.customerIndexSelected = parseInt(event.target.value);
    }
  }

  tableChange(event: Event): void {
    if (event.target instanceof HTMLSelectElement && event.target.value != '') {
      this.tableIndexSelected = parseInt(event.target.value);
    }
  }
}
