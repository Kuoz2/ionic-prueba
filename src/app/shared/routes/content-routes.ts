import {Routes} from '@angular/router';


export const content: Routes = [

  {
    path:'',
        redirectTo: 'navegacionboton/navboton',
          pathMatch: 'prefix'
  },


{
path: 'products',
loadChildren: () => import('../../components/products/products.module').then(m => m.ProductsModule),
data: {
  breadcrumb: "Productos"
},
},

{
path: 'pages',
loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule),
data: {
  breadcrumb: "Pagos"
},
},
{
path: 'auth',
loadChildren: () => import('../../components/auth/auth.module').then(m => m.AuthModule),
data:{
  breadcrumb: "Autentificación"
},
},
{
path: 'navegacionboton',
loadChildren: () => import('../../components/botoncillo/botoncillo.module').then(m => m.BotoncilloModule)
}
];
