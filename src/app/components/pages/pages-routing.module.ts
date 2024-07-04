import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorAppComponent } from './contenedor-app/contenedor-app.component';
import { ListproductComponent } from './appsale/listproduct/listproduct.component';
import { AppsaleComponent } from './appsale/appsale.component';
import { ListPageComponent } from './list-page/list-page.component';

const routes: Routes = [
  {
    path: '',

    children: [

      {
        path:'lista-producto',
        component:ListproductComponent
      },
      {
        path:'realizar-venta',
        component:AppsaleComponent
      },
      {
        path:'lista-pago',
        component:ListPageComponent,
        data:{
          title: "Ventas",
          breadcrumb:'Lista de ventas'
        },
        },
      {
        path:"vender-app",
        component:AppsaleComponent
      },
      {
        path:"lita-productos",
        component:ListproductComponent
      },

      {
        path:'app-pago',

        component:ContenedorAppComponent,

        data:{
          title:"Pagos",
          breadcrumb:"Pagar"
        }
      },



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
