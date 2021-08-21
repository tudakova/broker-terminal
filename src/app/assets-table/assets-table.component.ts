import { Component, OnInit } from '@angular/core';
import {BrokerService} from "../_services/broker.service";
import {Column} from "../_models/column";

@Component({
  selector: 'app-assets-table',
  templateUrl: './assets-table.component.html',
  styleUrls: ['./assets-table.component.scss']
})
export class AssetsTableComponent implements OnInit {
  dataSource: any;
  columns: Column[] = [];
  columnsName: string[] = [];

  constructor(private service: BrokerService) {
    service.dealerAssets.subscribe(x => this.dataSource = x);

    service.columnData.subscribe(x =>  {
      this.columns = [{id: null, name: "dealerName", isAutoMode: false, autoAmount: 0}].concat(x);
      this.columnsName = this.columns.map((column: Column) => column.name);
    });
  }

  ngOnInit(): void {
  }

  getActive(element: { actives: any[]; }, columnId: any) {
    return element.actives.find(item => item.activeId === columnId);
  }
}
