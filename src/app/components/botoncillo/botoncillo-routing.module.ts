import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { content } from 'src/app/shared/routes/content-routes';
import { NavbotonesComponent } from './navbotones/navbotones.component';

const routes: Routes = [

  {
    path: '',
    children:[{
      path: 'navboton',
      component: NavbotonesComponent,
      data:{title: "navegación por botones", breadcrumb:'otra forma de navegar'},

    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotoncilloRoutingModule { }
