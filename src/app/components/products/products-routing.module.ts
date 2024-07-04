import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './physical/category/category.component';

import {ListaproductoComponent} from "./physical/listaproducto/listaproducto.component";
import {VencimientosComponent} from "./physical/vencimientos/vencimientos.component";

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'physical/category',
        component: CategoryComponent,
        data: {
          title: "Categoarias",
          breadcrumb: "Categorias"
        },
      },


      {
        path: 'physical/lista-editar',
        component: ListaproductoComponent,
        data:{
          title: 'lista y editar producto',
          breadcrumb:'lista editar producto'
        },
       },

      {
        path:'physical/vencimiento',
        component: VencimientosComponent,
        data:{
          title:'Vencimiento',
          breadcrumb:'Productos vencidos'
        },
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
