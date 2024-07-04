import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { content } from './shared/routes/content-routes';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,

    },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
