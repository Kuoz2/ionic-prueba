import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenedorAppComponent } from './contenedor-app/contenedor-app.component';
import { ListPageComponent } from './list-page/list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppsaleComponent } from './appsale/appsale.component';
import { ListproductComponent } from './appsale/listproduct/listproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { HoraActualService } from 'src/app/Service/hora-actual.service';

@NgModule({
  declarations: [
    ContenedorAppComponent,
    AppsaleComponent,
    ListproductComponent,
    ListPageComponent,

  ],
  imports: [
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CommonModule,
    NgxPrintModule,
    PagesRoutingModule
  ],
  providers:[HoraActualService],
  schemas:[
      NO_ERRORS_SCHEMA,

  ]
})
export class PagesModule { }
