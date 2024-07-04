import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DROPZONE_CONFIG, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';

import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from "ngx-spinner";
import { SocketIoModule } from 'ngx-socket-io';
import { ListaproductoComponent } from './physical/listaproducto/listaproducto.component';
import { CategoryComponent } from './physical/category/category.component';
import { VencimientosComponent } from './physical/vencimientos/vencimientos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [
    ListaproductoComponent,
    CategoryComponent,
    VencimientosComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProductsRoutingModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    SocketIoModule,
    SharedModule
  ],
  schemas:[
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    NgbActiveModal,
  ],

})
export class ProductsModule { }
