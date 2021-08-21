import {Component, OnInit} from '@angular/core';
import {BrokerService} from "../_services/broker.service";
import {UserAssetsService} from "../_services/user.assets.service";
import {Column} from "../_models/column";
import {User} from "../_models/user";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  dataSource: any[] = [];
  columns: Column[] = [];
  columnsName: string[] = [];

  constructor(
    private service: BrokerService,
    private userAssetsService: UserAssetsService
  ) {
    service.columnData.subscribe(x => {
      this.columns = [{id: null, name: "actives", isAutoMode: false, autoAmount: 0}].concat(x);
      this.columnsName = this.columns.map((column: Column) => column.name);
    });

    this.userAssetsService.getAllAssets();

    service.userAssets.subscribe(x => this.dataSource = [x])
  }

  ngOnInit(): void {
  }

}
