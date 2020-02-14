import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataApiService } from './services/data-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReactiveTableComponent } from './components/reactive-table/reactive-table.component';
import {DataTableModule } from 'ornamentum';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalComponent,
    NavbarComponent,
    ReactiveTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTableModule.forRoot()
  ],
  providers: [DataApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
