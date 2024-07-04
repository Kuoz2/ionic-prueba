import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Observable, Subject, BehaviorSubject, of } from "rxjs";
import { CartServiceService } from "src/app/Service/cart-service.service";
import { SqliteService } from "src/app/Service/sqlite.service";
import { Produ } from "src/app/components/Modulos/Produ";
import { Productos } from "src/app/components/Modulos/Productos";


@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss']
})
export class ListproductComponent implements OnInit {
  nombre!: string;
  precio:number=0;
  public descuentos!: number;
  Productos_lista!: Observable<Productos[]>;
  Productos_sin_id!: Object;
  isloading!: boolean;
  producsqlite:any[] = [];
  inventariosql!: Produ;
  public listsqliteprod!: Observable<Produ>;
  productos = new BehaviorSubject<Produ | null>(null);
  //Enviando un mensaje al padre
  @Output() mensaje = new EventEmitter<boolean>();
  elmensaje = false
  //Aqui se almacenara lo que se este mandando desde el componente hermano
  @Input()encontrandoApp: string = "";
  //Aqui mandaremos la categoria para filtrar los productos
  @Input()encontrandoCategoriasApp:string = "";
  constructor(private carservice:CartServiceService,
     private sanitizar:DomSanitizer, private sqlite3:SqliteService) {
  }
   ngOnInit() {
    this.isloading = false
      this.listaproductoAsync()
              }

   enviomensaje(){
    console.log('entre el mensaje', this.elmensaje)
    this.elmensaje = true
    this.mensaje.emit(this.elmensaje)

  }
 async listaproductoAsync() {
    //this.Productos_lista = this.productos_car .item_productos();
      this.producsqlite  =  this.sqlite3.recolector
  }


  PurificandoLink(dato:any):SafeUrl{
    return this.sanitizar.bypassSecurityTrustUrl(dato)
  }
 async addCart(product: any) {

    delete product.sinventario
    delete product.sinventario2
    console.log('lo que entra', product)

    if(product.pcodigo){
      Object.assign(product, {sinventario:true})
    }else{
      Object.assign(product, {sinventario2:false})
    }
    const data = product;
    const elemento = {quantity: 1};
    console.log(data.quantity)
    if (data.quantity >= elemento.quantity){
      this.carservice.changeCart(data)
    }else {

      const cambio = Object.assign( product, elemento )
      this.carservice.changeCart(cambio)
  }
  this.nombre ="";
  this.precio = 0;
  this.encontrandoApp = ""
  }

}
