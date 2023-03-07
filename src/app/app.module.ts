import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CitiesComponent} from './component/cities/cities.component';
import {FormsModule} from "@angular/forms";
import {CityEditorComponent} from './component/city-editor/city-editor.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from 'ngx-pagination';
import { NgOptimizedImage } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {GlobalErrorHandler} from "./global-error-handler";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgOptimizedImage,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
