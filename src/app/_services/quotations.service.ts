import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Quotation} from "../_models/quotation";

@Injectable({ providedIn: 'root' })
export class QuotationsService {
  private quotesSubject: BehaviorSubject<Quotation[]>;
  public quotes: Observable<Quotation[]>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.quotesSubject = new BehaviorSubject<Quotation[]>([]);
    this.quotes = this.quotesSubject.asObservable();
  }

  getAll() {
    return this.http.get<Quotation[]>(`${environment.apiUrl}/quotes`)
      .subscribe(quotes => {
        this.quotesSubject.next(quotes);
      });
  }
}
