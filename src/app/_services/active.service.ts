import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import {Active} from "../_models/active";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ActiveService {
  private activesSubject: BehaviorSubject<Active[]>;
  public actives: Observable<Active[]>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.activesSubject = new BehaviorSubject<Active[]>([]);
    this.actives = this.activesSubject.asObservable();
  }

  getAll() {
    return this.http.get<Active[]>(`${environment.apiUrl}/actives`)
      .subscribe(actives => {
        this.activesSubject.next(actives);
      });
  }
}

