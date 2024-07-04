import { Injectable, effect } from "@angular/core";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite/ngx";
import { LoadingController } from "@ionic/angular/providers/loading-controller";
import { Observable, Subject } from "rxjs";

export class Productoos{
  pcodigo: number = 0;
  nombre: string = "";
   precio: number = 0;
   precioiva: number = 0;
   fechain: string = "";
    cantidad: number=0;
     categoryid: number=0;
     quantity:number=0;
     fechavenci: string="";
}
@Injectable({
  providedIn: 'root'
})

export class SqliteService {
  public  productos=new Subject<any>()
  public SeleccionProductos=new Subject<any>()
  public resultados2=new Subject<any>()
  public recolector: any[]=[];
  public obtenerProductos:any[]=[];
  obtener_dias:any[] = [];
  obtener_anio:any[] = [];
  mes_actual = new Date().getMonth() + 1;
  dia_actual = new Date().getDate();
  anio_actual = new Date().getFullYear();
  obtener_nombre_prd : any[]= [];
  obtener_fechacompleta: any[] = []
  obtener_codigo: any[] = []
  public resultado:any[] = [] ;
  public coneccion:SQLiteObject
  private db2:SQLiteObject;
  obtener_mes:any[] = [];
constructor(     private sqliteconnecion:SQLite,

  ){

}
crearconeccion(){
  return this.sqliteconnecion.create({
    name:'data.db',
    location:'default',
  })
}

llamarProductos(){
  try
  {
    this.crearconeccion().then((db:SQLiteObject) => {
      this.db2=db
      this.Coneccion(this.db2)
    }).catch((res)=>{console.log("error de busqueda",res)}).then(()=>{
  this.db2.executeSql('select * from productos', [])
  .then((result) => {
    console.log('resultado',result)
    for(let i=0; i<result.rows.length;i++){
      this.RecolectarData(result.rows.item(i))
    }
  }).then(async ()=>{
    await this.estanPorvencer()
  }).catch((res) => {console.log("error al encontrar vencidos", res)}).then(()=>{

  })
  .catch(e => alert(JSON.stringify(e)))
    })
  }
  catch(err:any){
     console.log('no se encontro la bd', err)
  }
}
//Coneccion a la databse
Coneccion(a:any):SQLiteObject{
  return this.coneccion = a
}
//Se recolecta todos los productos.
RecolectarData(a:Productoos):Observable<Productoos>{

this.recolector.push(a)
this.productos.next(this.recolector)
return this.productos.asObservable()
}



estanPorvencer():Observable<any> {

    if(this.recolector.length != 0 ){

      this.recolector.forEach((respuesta:any) => {
        if(respuesta.fechavenci != null ){
          this.obtener_mes.push(parseInt(respuesta.fechavenci.slice(5)));
          // tslint:disable-next-line:max-line-length radix
                                                                       this.obtener_dias.push(parseInt(respuesta.fechavenci.slice(8)));
          // tslint:disable-next-line:max-line-length radix
                                                                       this.obtener_anio.push(parseInt(respuesta.fechavenci.slice(0, 4)));
                                                                       this.obtener_nombre_prd.push(respuesta.nombre);
                                                                       this.obtener_fechacompleta.push(respuesta.fechavenci)
                                                                       this.obtener_codigo.push(respuesta.pcodigo)
        }

                                                      });


for (const i in this.obtener_dias) {
!Number.isNaN(this.obtener_dias[i])
!Number.isNaN(this.obtener_mes[i])
!Number.isNaN(this.obtener_anio[i])
console.log('Esto vencio', this.obtener_dias[i]);

if (this.obtener_dias[i] < this.dia_actual) {
} else {
let fecha2 = new Date();
let minisegundos = 24 * 60 * 60 * 1000;
let fecha1 = new Date(this.obtener_fechacompleta[i])
let milesegundostranscurridos = Math.abs(fecha2.getTime() - fecha1.getTime());
let diastranscurridos = Math.round(milesegundostranscurridos / minisegundos);
let porcentajedias = diastranscurridos * 100
let raiscuadrada = Math.sqrt(porcentajedias)
const objectosjsonobtenidos = raiscuadrada.toFixed(0)

// tslint:disable-next-line:max-line-length radix
if(diastranscurridos <= 10 && diastranscurridos !== 0){
  this.resultado.push({
    nombre: this.obtener_nombre_prd[i],
    vence_en:  diastranscurridos,
     queda_un:  objectosjsonobtenidos,
      codigo: this.obtener_codigo[i]
    })
    console.log("cosas del push", this.resultado)
    this.resultados2.next(this.resultado)

}

}

}
}else{alert("no hay datos" + this.recolector)}

  // tslint:disable-next-line:radix


  return this.resultados2.asObservable()

}


guardarventas(a:any){
   return this.coneccion.executeSql("INSERT INTO ventas VALUES (?,?,?,?,?)",[a.preciov, a.catnidadv,a.fechav,a.metodov, a.productoid, a.productoin])
}

}
