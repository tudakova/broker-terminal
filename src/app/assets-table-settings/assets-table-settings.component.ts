import {Component, OnInit} from '@angular/core';
import {BrokerService} from "../_services/broker.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogOverviewSettingsComponent} from "../dialog-overview-settings/dialog-overview-settings.component";
import {Column} from "../_models/column";

@Component({
  selector: 'app-assets-table-settings',
  templateUrl: './assets-table-settings.component.html',
  styleUrls: ['./assets-table-settings.component.scss']
})
export class AssetsTableSettingsComponent implements OnInit {
  dataSource = Array(this.service.getSettings());
  columns: Column[] = [];
  columnsName: string[] = [];

  constructor(private service: BrokerService, public dialog: MatDialog) {
    service.columnData.subscribe(x =>  {
      this.columns = [{id: null, name: "actives", isAutoMode: false, autoAmount: 0}].concat(x);
      this.columnsName = this.columns.map((column: Column) => column.name);
    });
  }

  ngOnInit(): void {
  }

  changeMode(columnName: string, isAutoMode: boolean) {
    if (!isAutoMode) {
      // @ts-ignore
      let autoAmount = this.columns.find(item => item.name === columnName).autoAmount;
      const dialogRef = this.dialog.open(DialogOverviewSettingsComponent, {
        width: '250px',
        data: {amount: autoAmount}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        autoAmount = result;
        if (autoAmount) {
          this.service.changeMode(columnName, autoAmount, isAutoMode);
          this.dataSource = Array(this.service.getSettings());
        }
      });
    } else {
      this.service.changeMode(columnName, 0, isAutoMode);
      this.dataSource = Array(this.service.getSettings());
    }

  }

}
