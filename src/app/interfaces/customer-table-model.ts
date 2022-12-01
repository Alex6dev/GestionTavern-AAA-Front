import { CustomerModel } from "./customer";
import { TableRest } from "./table-rest";

export interface CustomerTableModel {
    customer:CustomerModel;
    tableRest:TableRest;
}
