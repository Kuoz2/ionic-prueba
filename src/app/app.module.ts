import { BotoncilloModule } from './components/botoncillo/botoncillo.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductsModule } from './components/products/products.module';
import { PagesModule } from './components/pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';




@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule,BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     NgbModule,
     ProductsModule,
     PagesModule,
     ReactiveFormsModule,
     FormsModule,
     NgxPaginationModule,
     BotoncilloModule,
     SharedModule
    ],
  providers: [SQLite,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
