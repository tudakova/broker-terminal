import {Injectable} from '@angular/core';
import {DealerService} from "./dealer.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ActiveService} from "./active.service";
import {combineLatest} from 'rxjs';
import {map} from "rxjs/operators";
import {Column} from "../_models/column";
import {QuotationsService} from "./quotations.service";
import {UserAssetsService} from "./user.assets.service";

@Injectable({
  providedIn: 'root'
})
export class BrokerService {
  dealerAssetsSubject: BehaviorSubject<any>;
  dealerAssets: Observable<any>;
  private dealerAssetsList: any[] = [];

  columnDataSubject: BehaviorSubject<any>;
  columnData: Observable<any>;
  private columnDataList: any[] = [];

  userAssetsSubject: BehaviorSubject<any>;
  userAssets: Observable<any>;
  private userAssetsObject: any = {};

  constructor(
    private dealerService: DealerService,
    private activeService: ActiveService,
    private quotationsService: QuotationsService,
    private userAssetsService: UserAssetsService
  ) {
    this.dealerAssetsSubject = new BehaviorSubject<any>([]);
    this.dealerAssets = this.dealerAssetsSubject.asObservable();
    this.dealerAssets.subscribe(x => this.dealerAssetsList = x);

    this.columnDataSubject = new BehaviorSubject<any>([]);
    this.columnData = this.columnDataSubject.asObservable();
    this.columnData.subscribe(x => this.columnDataList = x);

    this.userAssetsSubject = new BehaviorSubject<any>([]);
    this.userAssets = this.userAssetsSubject.asObservable();
    this.userAssets.subscribe(x => this.userAssetsObject = x);

    combineLatest(
      this.dealerService.dealers,
      this.activeService.actives,
      this.quotationsService.quotes,
      this.userAssetsService.assets
    ).subscribe(([dealers, actives, quotes, assets]) => {
      if (dealers.length > 0 && actives.length > 0) {
        this.fillDealerList(dealers, actives, quotes);
        this.fillUserAssets(assets, actives);

        if (this.columnDataList.length === 0) {
          this.fillColumns(actives);
        }
      }
    });
  }

  fillDealerList(dealers: any, actives: any, quotes: any) {
    let result: { dealerId: number; dealerName: string; actives: any; }[] = [];
    dealers.forEach((dealer: { id: any; name: any; }) => {

      let activesList = quotes
        .filter((quote: { dealerId: any; }) => quote.dealerId === dealer.id)
        .map((quote: { [x: string]: any; dealerId: any; }) => {
          let {id, dealerId, ...withoutDealerId} = quote;
          return withoutDealerId
        });

      activesList = this.checkActives(dealer.id, activesList);

      result.push({
        dealerId: dealer.id,
        dealerName: dealer.name,
        actives: activesList
      });
    });
    this.dealerAssetsSubject.next(result);
  }

  checkActives(dealerId: number, newActives: any[]) {
    let dealerAsset = this.dealerAssetsList.find(item => item.dealerId === dealerId);
    let result = newActives;
    if (dealerAsset && dealerAsset.actives) {
      result = newActives.map(newActive => {
        let oldActive = dealerAsset.actives.find((item: { activeId: any; }) => item.activeId === newActive.activeId);
        if (oldActive && Date.parse(newActive.validFrom) < Date.parse(oldActive.validFrom)) {
          return oldActive;
        }

        newActive.prevPrice = oldActive ? oldActive.curPrice : " - ";
        newActive.curPrice = newActive.price;

        return newActive;
      })
    }
    return result;
  }

  fillColumns(actives: any) {
    let result: Column[] = [];
    actives.forEach((item: { id: any; name: any; }) => {
      result.push({
        ...item, isAutoMode: true, autoAmount: 0
      });
    })
    this.columnDataSubject.next(result);
  }

  fillUserAssets(userAssets: any, actives: any) {
    let result: any = {};
    userAssets.forEach((item: { activeId: any; amount: any; }) => {
      actives.forEach((active: { name: string | number; id: any; }) => {
        result[active.name] = active.id === item.activeId ? item.amount : 0;
      });
    })
    this.userAssetsSubject.next(result);
  }

  getSettings() {
    let settings: any = {};
    this.columnData
      .pipe(map(items => items))
      .subscribe(items => {
        items.forEach((item: { name: string | number; isAutoMode: any; }) => {
          settings[item.name] = item.isAutoMode;
        })
      });
    return settings;
  }

  changeMode(columnName: string, autoAmount: number, isAutoMode: boolean) {
    this.columnDataList.filter((item: { name: string; }) => item.name === columnName)
      .forEach((item: { isAutoMode: boolean; autoAmount: any; }) => {
        item.isAutoMode = !item.isAutoMode;
        item.autoAmount = !isAutoMode ? autoAmount : item.autoAmount;
      });
  }
}
