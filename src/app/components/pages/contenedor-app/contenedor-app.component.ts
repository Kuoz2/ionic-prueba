import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenedor-app',
  templateUrl: './contenedor-app.component.html',
  styleUrls: ['./contenedor-app.component.scss'],
})
export class ContenedorAppComponent  implements OnInit {
  textoapp: string = "";
  categoriapp!:string;
  mensaje!:string
  constructor() { }
  elmensaje:string = '';
  ngOnInit(): void {
  }
  viendotexto(){
    console.log("texto", this.textoapp)

  }

}
