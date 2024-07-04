import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Fecha_vencimiento } from './../../../Modulos/Fecha_vencimiento';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/Service/websocket.service';
import { Produ } from 'src/app/components/Modulos/Produ';
import { SqliteService } from 'src/app/Service/sqlite.service';

@Component({
  selector: 'app-vencimientos',
  templateUrl: './vencimientos.component.html',
  styleUrls: ['./vencimientos.component.scss']
})
export class VencimientosComponent implements OnInit {
  p: any;

  datos!: Observable<Produ>
  // tslint:disable-next-line:variable-name
  fechas_avencer!: Produ;
    // tslint:disable-next-line:variable-name
  fechas_vence_prox!: Fecha_vencimiento[];
    // tslint:disable-next-line:variable-name
  obtener_mes:number[] = [];
    // tslint:disable-next-line:variable-name
  obtener_dias:number[] = [];
    // tslint:disable-next-line:variable-name
  obtener_anio:number[] = [];
    // tslint:disable-next-line:variable-name
  mes_actual = new Date().getMonth() + 1;
    // tslint:disable-next-line:variable-name
  dia_actual = new Date().getDate();
    // tslint:disable-next-line:variable-name
  anio_actual = new Date().getFullYear();

  segundas_fechas:object[] = []

  resultado:any[] = [] ;

    // tslint:disable-next-line:variable-name
  obtener_nombre_prd:any[] = [];

    // tslint:disable-next-line:variable-name
  cantidad_dias_vencido: any;
  // Obtener la marca
  obtener_marca = []
  obtener_categoria = []
  obtener_fechacompleta:any[] = []
  isloading: boolean;
  diastrascurridos2!: number;
  fechasrecopildas!: Observable<Produ>
  informacionobtenida!: Produ | Produ[];
    constructor(
      private wbs:WebsocketService,public database:SqliteService) {  this.isloading = false       }

   async ngOnInit() {

      this.wbs.fechasencontra.forEach(res => { this.informacionobtenida =  res
      })


     await this.estanPorvencer()

              // await this.productosquevenceran()
            /*   await this.productosquevenceran().finally(() => {this.isloading = true;  this.ngxspinner.hide('spinnerdashcategori');
           });*/
   }

    estanPorvencer() {
              // tslint:disable-next-line:radix
             this.database.recolector.map((respuesta:any) => {
              const ma = parseInt(respuesta.fechavenci.slice(5))
              this.obtener_mes.push(ma);
                // tslint:disable-next-line:max-line-length radix
               this.obtener_dias.push(parseInt(respuesta.fechavenci.slice(8)));
                // tslint:disable-next-line:max-line-length radix
               this.obtener_anio.push(parseInt(respuesta.fechavenci.slice(0, 4)));
                this.obtener_nombre_prd.push(respuesta.nombre);
                this.obtener_fechacompleta.push(respuesta.fechavenci)
                                                                            });
                                                                            console.log('dias', this.obtener_dias)
                                                                            console.log('mes', this.obtener_mes )
                                                                            console.log('anio', this.obtener_anio)
                                                                            console.log('nombre', this.obtener_nombre_prd)
                                                                            console.log('fechas', this.obtener_fechacompleta)

                for (const i in this.obtener_dias) {
                  if (this.obtener_dias[i] < this.dia_actual && this.obtener_dias[i] !== 0 || this.obtener_dias[i] < 0) {
                  } else {
                      let fecha2 = new Date();
                      let minisegundos = 24 * 60 * 60 * 1000;
                      let fecha1 = new Date(this.obtener_fechacompleta[i])
                      let milesegundostranscurridos = Math.abs(fecha2.getTime() - fecha1.getTime());
                      let diastranscurridos = Math.round(milesegundostranscurridos / minisegundos);
                      let porcentajedias = diastranscurridos * 100
                      let raiscuadrada = Math.sqrt(porcentajedias)
                      const objectosjsonobtenidos = raiscuadrada.toFixed(0)
                      if(!Number.isNaN(parseInt(objectosjsonobtenidos))){
                        this.resultado.push({
                                                             nombre: this.obtener_nombre_prd[i] as string,
                                                              vence_en:  diastranscurridos,
                                                              queda_un:  objectosjsonobtenidos })
                      }
                      // tslint:disable-next-line:max-line-length radix

                  }

              }



 }

// calculandofecha(){
  // let fecha2 = new Date()
   //let minisegundos = 24 * 60 * 60 * 1000;
   //for(let i of this.obtener_fechacompleta){
     //    let fecha1 = new Date(i)
       //  let milesegundostranscurridos = Math.abs(fecha2.getTime() - fecha1.getTime());
         //let diastranscurridos = Math.round(milesegundostranscurridos / minisegundos);
         //let porcentajedias = diastranscurridos * 100
         //let raiscuadrada = Math.sqrt(porcentajedias)
         //const objectosjsonobtenidos = {queda_un: raiscuadrada.toFixed(2)}
         //console.log(objectosjsonobtenidos)
       //}

 //}

 productosquevenceran(){
   return this.wbs.busProd().toPromise().then((res:any) => {
     console.log('respues', res)
     for(const i of [res]){
       let fecha2 = new Date();
       let minisegundos = 24 * 60 * 60 * 1000;
       let fecha1 = new Date(i.fechavenci)
       let milesegundostranscurridos = Math.abs(fecha2.getTime() - fecha1.getTime());
       let diastranscurridos = Math.round(milesegundostranscurridos / minisegundos);
       let porcentajedias = diastranscurridos * 100
       let raiscuadrada = Math.sqrt(porcentajedias)
       console.log('segundas fechas', diastranscurridos)
       this.diastrascurridos2 = diastranscurridos
       this.segundas_fechas.push({
          dedscripcion: i.nombre,
          vencido_en:  parseInt(raiscuadrada.toFixed(0))
         })
         console.log('datos finales', this.segundas_fechas)
     }
   })
 }

 enviar_email(){
 }


}
