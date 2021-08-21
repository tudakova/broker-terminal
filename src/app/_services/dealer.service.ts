import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import {Dealer} from "../_models/dealer";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class DealerService {
  private dealersSubject: BehaviorSubject<Dealer[]>;
  public dealers: Observable<Dealer[]>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.dealersSubject = new BehaviorSubject<Dealer[]>([]);
    this.dealers = this.dealersSubject.asObservable();
  }

  getAll() {
    return this.http.get<Dealer[]>(`${environment.apiUrl}/dealers`)
      .subscribe(dealers => {
        this.dealersSubject.next(dealers);
      });
  }
}
