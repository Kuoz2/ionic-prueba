import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Produ } from './components/Modulos/Produ';
import { Fecha_vencimiento } from './components/Modulos/Fecha_vencimiento';
import {SplashScreen} from '@capacitor/splash-screen'
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { SqliteService } from './Service/sqlite.service';
class producto{
  public nombre:string;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private initPlugin!: boolean;
  public resultado: any;
  fechas_vence_prox!: Fecha_vencimiento[];
  // tslint:disable-next-line:variable-name

  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:variable-name

p: any;
db2:SQLiteObject;


  informacionobtenida!: any;
  title = 'Beta';
  public producto!: Observable<Produ>;
 constructor(
  public spinner: NgxSpinnerService,
  public loadingController: LoadingController,
  public database:SqliteService
   ) {
    this.loadingController.create({
      message: 'Cargando...',
      duration: 4000,
  }).then(async (response ) => {
    this.database.llamarProductos();
      response.present();

      await response.onDidDismiss().then((response)=> {
        this.resultado =  this.database.estanPorvencer()
        console.log("resultado de las fechas", this.resultado)

        console.log('carga completada',response)

      })
  })

}
onIonInfinite(ev:any) {
  setTimeout(() => {
    (ev as InfiniteScrollCustomEvent).target.complete();
  }, 500);
}
CreteConecctionSQLITE(){
return
}

CreateTable(){
  this.db2.executeSql('CREATE TABLE IF NOT EXISTS producto(nombre:VARCHAR(32))',[])
  .then((result)=>alert('tabla creada'))
  .catch(e => alert(JSON.stringify(e)))
}
InsertarProducto(){
  var nom:string = "prodcto nuevo";
  let query:string = 'insert into producto(nombre) values("'+nom+'")';
  this.db2.executeSql(query,[])
  .then(()=> alert('producto insertado'))
  .catch(e => alert(JSON.stringify(e)))
}
SelectData(){
  this.db2.executeSql('select * from productos', [])
  .then((result) => {
    console.log('resultado',result)
    for(let i=0; i<result.rows.length;i++){

    }
  }).catch(e => alert(JSON.stringify(e)))
}
async probandia (){
  SplashScreen.hide()

}
async buscaProducto(){
}
  ngAfterViewInit() {



  }
// Verificar si estan las marcas, categorias, productos



  async ngOnInit() {



  //this.wbs.busfechas().subscribe(res => {
   // this.informacionobtenida = res
  //})
  //this.sqlite.initializePlugin()

 //this.wbs.busProd()
// this.wbs.busCategoria()
// this.wbs.Cambiocantidadprod()


 /*   this.navegador_habierto()
   window.addEventListener('devtoolschange', event => {
   console.log('Is DevTools open:', event.detail.isOpen);
   console.log('DevTools orientation:', event.detail.orientation);
   if(event.detail.isOpen == true)
    {
    window.location.href = "https://errorconsole.herokuapp.com/"
   }
   });*/
  }


navegador(){
  var sBrowser, sUsrAg = navigator.userAgent;
  if(sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome";
} else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
} else if (sUsrAg.indexOf("Opera") > -1) {
    sBrowser = "Opera";
} else if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
} else if (sUsrAg.indexOf("MSIE") > -1) {
    sBrowser = "Microsoft Internet Explorer";
}

alert("Usted está utilizando: " + sBrowser);
}
}
