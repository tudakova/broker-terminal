import { Component, OnInit, OnDestroy } from '@angular/core';
import {DealerService} from "../_services/dealer.service";
import {ActiveService} from "../_services/active.service";
import {QuotationsService} from "../_services/quotations.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  timerId: number | undefined;
  constructor(
    private dealerService: DealerService,
    private activeService: ActiveService,
    private quotationsService: QuotationsService
  ) { }

  ngOnInit(): void {
    this.dealerService.getAll();
    this.activeService.getAll();
    this.quotationsService.getAll()
    this.timerId = setInterval(() => this.quotationsService.getAll(), 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

}
