import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CustomerModel,
  tabName,
  tabSurName,
} from 'src/app/interfaces/customer';
import { CustomerTableModel } from 'src/app/interfaces/customer-table-model';
import { RecipeModel } from 'src/app/interfaces/recipe';
import { TableRestModel } from 'src/app/interfaces/table-rest';
import { ManagerModel } from 'src/app/interfaces/manager';
import { TableRestService } from '../tableRest/tableRest.service';
import { ManagerService } from '../manager/manager.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerManagementService {
  private customers = new BehaviorSubject<CustomerModel[]>(
    [] as CustomerModel[]
  );
  customers$ = this.customers.asObservable();

  private urlNewCustomer =
    environment.apiUrl + 'api/game/customerManagement/newCustomer';
  private urlAssignCustomerInTable =
    environment.apiUrl + 'api/game/customerManagement/customerAssignTable';
  private urlCustomerFinish =
    environment.apiUrl + 'api/game/customerManagement/customerFinish';
  private urlCustomerServed =
    environment.apiUrl + 'api/game/customerManagement/customerServed';

  constructor(
    private http: HttpClient,
    private tableService: TableRestService,
    private managerService: ManagerService
  ) {}
  setCustomers(newCustomers: CustomerModel[]): void {
    let customerNewName: CustomerModel[] = [];

    for (let index = 0; index < newCustomers.length; index++) {
      let customerCurrent = newCustomers[index];

      if (customerCurrent.name) customerNewName.push(customerCurrent);
      else {
        const name: string = this.getName();
        const nbImg: number = this.getImg();
        customerNewName.push({
          id: customerCurrent.id,
          purseOfGold: customerCurrent.purseOfGold,
          happiness: customerCurrent.happiness,
          hunger: customerCurrent.hunger,
          thirst: customerCurrent.thirst,
          nauseaLevel: customerCurrent.nauseaLevel,
          alcoholLevel: customerCurrent.alcoholLevel,
          toilet: customerCurrent.toilet,
          timeInTavern: customerCurrent.timeInTavern,
          nauseaTolerance: customerCurrent.nauseaTolerance,
          alcoholTolerance: customerCurrent.alcoholTolerance,
          gender: customerCurrent.gender,
          expGiven: customerCurrent.expGiven,
          idTableRest: customerCurrent.idTableRest,
          consommationStart: customerCurrent.consommationStart,
          commandList: customerCurrent.commandList,
          name: name,
          numImg: nbImg,
        });
      }
    }

    this.customers.next(customerNewName);
  }
  getName(): string {
    const name: string = tabName[Math.floor(Math.random() * tabName.length)];
    const surname: string =
      tabSurName[Math.floor(Math.random() * tabSurName.length)];
    return name + surname;
  }
  getImg(): number {
    return Math.floor(Math.random() * 7) + 1;
  }

  updateCustomer(
    customerBefore: CustomerModel,
    customerAfter: CustomerModel
  ): void {
    let newCustomers: CustomerModel[] = Array.from(this.customers.getValue());
    const index = newCustomers.findIndex(
      (element) => element === customerBefore
    );
    newCustomers[index] = customerAfter;
    this.setCustomers(newCustomers);
  }
  deleteCustomer(customer: CustomerModel): void {
    let newCustomers: CustomerModel[] = Array.from(this.customers.getValue());
    const index = newCustomers.findIndex((element) => element === customer);
    newCustomers.splice(index, 1);
    this.setCustomers(newCustomers);
  }

  getNewCustomer(): void {
    const body = JSON.parse(
      `{"managerId":${sessionStorage.getItem('idManager')}}`
    );
    this.http
      .post<CustomerModel>(this.urlNewCustomer, body)
      .subscribe((newCustomer) => {
        let newCustomers: CustomerModel[] = Array.from(
          this.customers.getValue()
        );
        newCustomers.push(newCustomer);
        this.setCustomers(newCustomers);
      });
  }

  assignCustomerInTable(customer: CustomerModel, table: TableRestModel): void {
    const body = JSON.parse(
      `{"customerId":${customer.id}, "tableId":${table.id}, "managerId":${sessionStorage.getItem('idManager')}}`
    );
    this.http
      .post<CustomerTableModel>(this.urlAssignCustomerInTable, body)
      .subscribe((customerTableModel) => {
        this.tableService.updateTable(table, customerTableModel.tableRest);
        this.updateCustomer(customer, customerTableModel.customer);
      });
  }

  customerServed(customer: CustomerModel): void {
    this.http
      .post<CustomerModel>(
        this.urlCustomerServed,
        JSON.parse(`{"customerId":${customer.id}}`)
      )
      .subscribe((customerUpdate) => {
        this.updateCustomer(customer, customerUpdate);
      });
  }
  customerFinish(customer: CustomerModel): void {
    const idManager=sessionStorage.getItem('idManager')!;
    const body = JSON.parse(
      `{"customerId":${customer.id}, "managerId":${idManager}}`
    );
    this.http
      .post<ManagerModel>(this.urlCustomerFinish, body)
      .subscribe((managerUpdate) => {
        this.deleteCustomer(customer);
        this.managerService.setManager(managerUpdate);
      });
  }
}
