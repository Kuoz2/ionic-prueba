import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedappPipe } from './Pipe/busquedapp.pipe';
import { BuscareninventarioPipe } from './Pipe/buscareninventario.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [
    BusquedappPipe,
    BuscareninventarioPipe,
    HeaderComponent,
    ContentLayoutComponent,
    SidebarComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [BusquedappPipe,
    BuscareninventarioPipe]
})
export class SharedModule { }
