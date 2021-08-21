import {Component, OnInit, Input} from '@angular/core';
import {UserAssetsService} from "../_services/user.assets.service";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-asset-cell',
  templateUrl: './asset-cell.component.html',
  styleUrls: ['./asset-cell.component.scss']
})
export class AssetCellComponent implements OnInit {

  @Input() active: any = null;
  @Input() isAutoMode: boolean = false;
  @Input() activeName: string = "";
  @Input() autoAmount: number = 0;
  @Input() dealerName: string = "";

  amountValue: string = "";

  constructor(private userAssetsService: UserAssetsService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.active && this.autoAmount >= this.active.minAmount && this.autoAmount <= this.active.maxAmount) {
      this.addActiveToUser();
    }
  }

  addActiveToUser() {
    const number = Number(this.amountValue);
    if (Number.isInteger(number) && number > 0) {
      this.userAssetsService.putAsset({activeName: this.activeName, amount: number})
        .subscribe(
          success => {
            if (success) {
              let message = `active: ${this.activeName}, dealer: ${this.dealerName}, amount: ${number}, price: ${this.active.curPrice}`;
              this.notificationService.success('Purchase successful!', message, 10000);
              this.userAssetsService.getAllAssets();
            }
          },
          error => {
            this.notificationService.error('Error!', error, 10000);
          });
    }
  }

}
