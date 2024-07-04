import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotoncilloRoutingModule } from './botoncillo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbotonesComponent } from './navbotones/navbotones.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NavbotonesComponent],
  imports: [
    CommonModule,
    BotoncilloRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BotoncilloModule { }
