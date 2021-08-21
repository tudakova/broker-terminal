import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';

import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from "@angular/material/tooltip";

import {AssetCellComponent} from './asset-cell/asset-cell.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AssetsTableComponent} from './assets-table/assets-table.component';
import {UserTableComponent} from './user-table/user-table.component';
import {AssetsTableSettingsComponent} from './assets-table-settings/assets-table-settings.component';
import {LoginComponent} from './login/login.component';

import {BrokerService} from "./_services/broker.service";
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import {DialogOverviewSettingsComponent} from './dialog-overview-settings/dialog-overview-settings.component';
import { NotificationComponent } from './notification/notification.component';
import {NotificationService} from "./_services/notification.service";

@NgModule({
  declarations: [
    AppComponent,
    AssetCellComponent,
    AssetsTableComponent,
    UserTableComponent,
    AssetsTableSettingsComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    DialogOverviewSettingsComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    BrokerService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
