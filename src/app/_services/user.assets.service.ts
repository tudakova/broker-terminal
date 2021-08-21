import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import {Asset} from "../_models/asset";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {User} from "../_models/user";

@Injectable({ providedIn: 'root' })
export class UserAssetsService {
  private assetsSubject: BehaviorSubject<Asset[]>;
  public assets: Observable<Asset[]>;
  // @ts-ignore
  private user: User;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.assetsSubject = new BehaviorSubject<Asset[]>([]);
    this.assets = this.assetsSubject.asObservable();
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  getAllAssets() {
    return this.http.get<Asset[]>(`${environment.apiUrl}/assets/${this.user.id}`)
      .subscribe(assets => {
        this.assetsSubject.next(assets);
      });
  }

  putAsset(object: any) {
    const body = {
      userId: this.user.id,
      ...object
    }
    return this.http.put<any>(`${environment.apiUrl}/assets/buy`, body)
  }
}
