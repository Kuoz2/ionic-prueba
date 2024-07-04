import { SqliteService } from './../../../../Service/sqlite.service';
import { Produ } from './../../../Modulos/Produ';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import {date_expiration, Productos, Stock} from '../../../Modulos/Productos';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {BehaviorSubject, Observable, Subject, of} from 'rxjs';
import { ProductoActualizar } from 'src/app/components/Modulos/ProductoActualizar';
import * as XLSX from 'xlsx'

import { Categorias } from 'src/app/components/Modulos/Categorias';
import * as FileSaver from 'file-saver';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8'

const EXCEL_EXT = '.xlsx'
@Component({
    selector: 'app-listaproducto',
    templateUrl: './listaproducto.component.html',
    styleUrls: ['./listaproducto.component.scss'],
})
export class ListaproductoComponent implements OnInit, OnDestroy, AfterViewInit {
    public buscarinventario:string=""
    public categoriasqlite!:Categorias
    active = 1;
    public closeResult!: string;
    public listproductosG!: Observable<Productos[]>;
    public listsqliteprod!:Observable<Produ | any>
    private unsubscribe$ = new Subject<void>();
    public formsqlite: FormGroup;
    listproductos!: Observable<Productos[]> ;
    productoporid: Productos = new Productos();
    public inventario2: any;
    isloading: boolean;
     infocartego:Subject<Categorias | null> = new BehaviorSubject<Categorias | null>(null);
    inventario2_datexpiration: date_expiration = new date_expiration();
    inventario2_stocknuevo: Stock =  new Stock();
    tomanuevoinventario: any
     productos:Subject<Produ | null> = new BehaviorSubject<Produ | null>(null);
    inventariosql!:Produ
    categorysqlite:Categorias[]=[]
    inventariorecoleccion:any[]=[]
    x:{}[] = []
    public contrasenia:any;
    opciones:number = 0;
    // tslint:disable-next-line:variable-name
    constructor(
                private modalService: NgbModal,
                private fb:FormBuilder,
                private database:SqliteService,
                private sqlite3:SQLite,
                public loadingController: LoadingController,
                private alertController: AlertController




    ) {
        this.formsqlite =  this.fb.group({
            id: new FormControl(0),
            pcodigo: new FormControl(0),
            nombre: new FormControl(''),
            precio: new FormControl(0),
            precioiva: new FormControl(0),
            cantidad: new FormControl(0),
            categoryid: new FormControl(0, [Validators.required]),
            fechavenci: new FormControl(0)
        })
    this.isloading = false;

    }
    ngAfterViewInit() {
        console.log(this.database.recolector)
        this.inventariorecoleccion = this.database.recolector
    }


    // tslint:disable-next-line:variable-name new-parens
    stock_actualizado: Stock = new Stock();
    // tslint:disable-next-line:new-parens
    ck = new Stock;
    // tslint:disable-next-line:variable-name
    stock_nuevo: number =0;
    // tslint:disable-next-line:variable-name
    stock_perdidas_nuevo!: number;
    d = 0;
    h = 0;
    j = 0;
    g = 0;
    k = 0;
    n = 0;
    fechavencimiento!: string;
    producstock!: number;
    stockperdida!: number;


  async ngOnInit() {

       //await  this.productosAsync();
       //await this.newinventario();
     //   this.someMethodIThinkMightBeSlow()
    }


    // Tomando el inventario nuevo.
     newinventario() {

    }

     cambiadColor(EsPr: number, i: string, id: string) {
         // tslint:disable-next-line:triple-equals
         if (EsPr > 10 || EsPr == 10) {
            const cambio = document.getElementById('estado' + i + id);
            cambio!.style.backgroundColor = '#B5FF33' ;
        }
     }

     cambiarColorGestion(EsPr: number, i: string, id: string) {
         // tslint:disable-next-line:triple-equals
         if (EsPr < 10 && EsPr != 0) {
             const cambio2 = document.getElementById('gestionar' + i + id);
             cambio2!.style.backgroundColor = '#F9FF33';
         }
     }

     cambiarColorSinStock(EsPr: number, i: string, id: string) {
         // tslint:disable-next-line:triple-equals
         if (EsPr == 0 ) {
             const cambio3 = document.getElementById('peligro' + i + id);
             cambio3!.style.backgroundColor = '#FA0000';
         }
         if (EsPr < 10 && EsPr != 0) {
            const cambio2 = document.getElementById('peligro' + i + id);
            cambio2!.style.backgroundColor = '#F9FF33';
        }
        if (EsPr > 10 || EsPr == 10) {
            const cambio = document.getElementById('peligro' + i + id);
            cambio!.style.backgroundColor = '#B5FF33';
        }
     }


   async productosAsync() {

   }


   async editarproductos(producto: ProductoActualizar, nuevo: any, perdida: any) {
    console.log("los productos cambiando", producto)
    producto.pcodigo = producto.pcodigo.toString()
      const stock = producto.stock;
      await this.editarstock(stock, nuevo, perdida);
    }



    async editarstock(stck: Stock, stnuevo: number , stlost: number | null) {
        // tslint:disable-next-line:variable-name
        const edicion_producto = stck;

        // tslint:disable-next-line:triple-equals
        if (stnuevo == 0 && stlost == 0 || stnuevo == null && stlost == null) {
        } else {
            // tslint:disable-next-line:triple-equals
            if (stnuevo != 0 && stlost == 0 || stlost == null) {
                edicion_producto.pstock += stnuevo ;
                edicion_producto.stock_lost += 0;
            } else {
                // tslint:disable-next-line:triple-equals
                if (stlost != 0 && stnuevo == 0 || stnuevo == null) {
                    edicion_producto.stock_lost += stlost;
                    edicion_producto.pstock += 0;
                } else {
                    // tslint:disable-next-line:triple-equals
                    if (stnuevo != 0 && stlost != 0 && stnuevo != null && stlost != null) {
                        edicion_producto.pstock += stnuevo;
                        edicion_producto.stock_lost += stlost;

                    }
                }

            }

            try{

            }catch(error){
                console.log(error)
            }

        }
    }



   async editar() {

        var id = localStorage.getItem('idc2');
       // tslint:disable-next-line:max-line-length
    //    await this.prod.buscarproductoporID(+id).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {this.productoporid = data; this.cd.markForCheck(); });
    }

    open2(content: any, catego: { id: any; pcodigo: any; nombre: any; precio: any; precioiva: any; cantidad: any; cnombre: any; fechain: any; }): void {

        this.invCatSqlite()

        //localStorage.setItem('idc2', catego.id);
       // this.editar();

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.formsqlite.controls['id'].setValue(catego.id)
        this.formsqlite.controls['pcodigo'].setValue(catego.pcodigo);
        this.formsqlite.controls['nombre'].setValue(catego.nombre);
        this.formsqlite.controls['precio'].setValue(catego.precio);
        this.formsqlite.controls['precioiva'].setValue(catego.precioiva);
        this.formsqlite.controls['cantidad'].setValue(catego.cantidad);
        this.formsqlite.controls['categoryid'].setValue(catego.cnombre);
        this.formsqlite.controls['fechavenci'].setValue(catego.fechain);


    }

    async actualizarregistro(){

        if(this.formsqlite.valid && this.formsqlite.value.categoryid.id !== undefined){
            console.log(this.formsqlite.value.categoryid.id !== undefined)
        this.formsqlite.value.precioiva = 0;
        this.formsqlite.value.categoryid = this.formsqlite.value.categoryid.id
        console.log('id', this.formsqlite)
        this.database.coneccion.transaction(()=>{
          this.database.coneccion.executeSql("UPDATE productos SET nombre=?, precio=?, precioiva=?,cantidad=?, fechavenci=?, categoryid=? WHERE pcodigo=?",[this.formsqlite.value.nombre,this.formsqlite.value.precio,this.formsqlite.value.precioiva,this.formsqlite.value.cantidad,this.formsqlite.value.fechavenci,this.formsqlite.value.categoryid,this.formsqlite.value.pcodigo])
          .then(async (result) => {
            if (result){
this.inventariorecoleccion.splice(0,this.inventariorecoleccion.length)
               await  this.database.coneccion.executeSql('SELECT * FROM productos',[])
                .then((result) => {
                  for(let i = 0; i < result.rows.length; i++){
                    this.inventariorecoleccion.push( result.rows.item(i))
                  }
                });
            }
          }).then(()=>{
            this.loadingController.dismiss().then((response: any) => {
              console.log('Datos cargados', response);
          }).catch((err: any) => {
              console.log('Error occured : ', err);
          });
          }).catch(e=>alert(JSON.stringify(e)))
        }).catch(e => alert(JSON.stringify(e)))

    //this.wbde.Upproducto(this.formsqlite.value)
        }else{ console.log("No se actualizo ")
            alert("Debe ingresar una categoría")}

   }

    open4(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        },
            (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
            );
    }

    async open5(content: any, inv2: { id: { toString: () => string; }; }) {
        localStorage.setItem('inv2', inv2.id.toString());
        await this.editar5();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      },
          (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
      );
    }
    async invCatSqlite(){
       this.database.coneccion.executeSql('SELECT rowid as id,  cnombre FROM categorias',[])
       .then((result)=>{
        for(let i=0; i<result.rows.length;i++){
          this.categorysqlite.push(result.rows.item(i))
        }
       })

       }

   async editar2() {
        const id = localStorage.getItem('idc2');
    }

      editar5() {
        const id = localStorage.getItem('inv2');
         // tslint:disable-next-line:max-line-length
    }

    open3(content3: any, catego: Stock): void {
        this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }


    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    guardarnewFyS(fechavencimiento: string, producstock: number, stockperdida: number) {
        this.inventario2_datexpiration.fecha_vencimiento = fechavencimiento;
        this.inventario2_datexpiration.stock_expiration = producstock;
        this.inventario2_datexpiration.cambio_fecha = true
        this.inventario2_datexpiration.cantidad_cambiadas = stockperdida;
        this.inventario2_datexpiration.actualizado_stockm = true
        this.inventario2_datexpiration.product_id = this.productoporid.id
        this.inventario2_stocknuevo.product_id = this.productoporid.id;
        this.inventario2_stocknuevo.pstock = producstock;
        this.inventario2_stocknuevo.stock_lost = stockperdida;

    }
    guardarinventario2(){

    }

    Obutildiad(productoporid: { precio_provider: number; margen: number; utilidad: any; }){

           const resultado = (productoporid.precio_provider * (productoporid.margen/100));
           //frm.value.pvalor = parseInt(resultado.toFixed(0));
         //  frm.value.utilidad =  parseInt((resultado - frm.value.pvalor).toFixed(0));
            const valor = (productoporid.precio_provider + parseInt(resultado.toFixed(0)))
           this.productoporid.pvalor = parseInt(resultado.toFixed(0));
           const dato = resultado.toFixed(0)
           productoporid.utilidad = valor

        }



    someMethodIThinkMightBeSlow() {
        const startTime = performance.now();

        // Do the normal stuff for this function

        const duration = performance.now() - startTime;
        console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
    }
    async  eliminarproducto(){
        var codigovalidador:string[] = []
        var codigovalidador2:string[] = []
        var codigovalidador3:string[] = []
        var codigovalidador4:string[] = []
        var validante = []
        for (var i = 0; i < 1; i++) {
           codigovalidador.push( this.randomNumber(0, 10))
           codigovalidador2.push( this.randomNumber(0, 10))
           codigovalidador3.push( this.randomNumber(0, 10))
           codigovalidador4.push( this.randomNumber(0, 10))
          }
          validante.push(codigovalidador[0],codigovalidador2[0],codigovalidador3[0],codigovalidador4[0])

          const Swal = require('sweetalert2')
        const valor = await Swal.fire({
            title: `Código: ${codigovalidador[0]} ${ codigovalidador2[0]} ${codigovalidador3[0]} ${codigovalidador4[0]}`,
            text: '¿Esta seguro de eliminar este producto?, si este producto esta asociado a una venta, se eliminaran ambos registros.'+
            ' debe ingresar el código antes de 10 segundos. ',
            icon: 'warning',
            timer: 10000,
            input: 'text',
            showConfirmButton:true,
            inputValue: '',
            confirmButtonText: 'Confirmar',
            timerProgressBar: true,
            inputPlaceholder:'Ingresar código',
            inputValidator: (value: any) => {
                if (!value) {
                  "Ingrese el código que se encuentra en la parte superior"
                }
              },
          })

            console.log("valor del swal",valor)
          let codig = validante.join().replace(/,/g, "")
          if( codig === valor.value){
          }else
          {
              alert("esto no se eliminara")
          }
        }
        randomNumber(max: number, min: number): any {
            const r = Math.random()*(max-min) + min
            return Math.floor(r)}
    sumarstock(a: number){
         this.productoporid.stock.pstock = (this.productoporid.stock.pstock + a)
    }

    // Exportador de excel

    open(content: any,c: number){

            this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
            this.opciones = c

    }
    verificarpw(b: string){
        if(b === '@#904#301_'){
            switch(this.opciones) {

                    case 2:
                        this.export_all_inventarie().then(() => {
                            this.contrasenia = '';
                            this.opciones = 0;
                        }  ).then(() => {
                            this.closeResult = `Dismissed ${this.getDismissReason('Cross click')}`;
                        })
                        break
            }

          }
    }
   async export_all_inventarie(){
        //this.almacenar(this.listproductosG, 1

        this.listsqliteprod.forEach( async (res:any) => {

        this.x.splice(0, this.x.length)

                //const sum = res.map(item => item.pvalor).reduce((prev, curr) => prev + curr, 0);
                const sum = res.map((item: { precio: any; }) => item.precio).reduce((prev: any, curr: any) => prev + curr, 0);
                //const sumStock = res.map(item => item.stock.pstock).reduce((prev, curr) => prev + curr, 0);
                const sumStock = res.map((item: { cantidad: any; }) => item.cantidad).reduce((prev: any, curr: any) => prev + curr, 0);
                //const psumiva = res.map(item => item.piva).reduce((prev, curr) => prev + curr, 0);
                const stvms = (sum * sumStock);
                console.log('suma de inventario', sum)
                console.log('sum y mult', stvms)
                console.log("sum inventario", this.x.length);
                console.log("sum inventario", sumStock);
                console.log('suma inventario', )

                console.log("valor de x ", this.x)
               for(const i of res){
                     var dato=  {
                    Codigo: i.pcodigo || 0,
                   // Nombre: i.category.cnombre +''+i.brand.bnombre + '' + i.pdescripcion,
                    Nombre: i.nombre,
                    //Costo: i.precio_provider || 0,
                    //Précio: i.pvalor || 0,
                    Précio: i.precio || 0,
                  //  Margen: i.margen || 0,
                   // Utilidad: i.utilidad || 0,
                    //Unidades: i.stock.pstock || 0,
                    Unidades: i.cantidad || 0,
                    //Precio_unidad: (i.pvalor * i.stock.pstock) || 0
                    Precio_unidad: (i.precio * i.cantidad) || 0
                }
                this.x.push(dato)
               }
              this.x.unshift(Object.assign( {Precio: sum},{Total_Unidades: sumStock}, {Total_inventario:stvms})  )
              this.exportar_excel_table();
             }  ).then(async ()=>  {

             }  )


    }
    exportar_excel_table()
    {

        console.log("excel", this.x)
        const excelnombre = "inventario"
        if(this.x.length != 0){
            const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.x)

        const workBook: XLSX.WorkBook = {
            Sheets: {'Inventario' : worksheet, },
            SheetNames: ['Inventario'],

        }

        const excelBuffer: any  = XLSX.write(workBook, {bookType: 'xlsx', type: 'array'});

        this.saveExcel(excelBuffer, excelnombre)
        this.contrasenia = '';
        this.opciones = 0;
    }





    }
    private saveExcel(buffer: any, fileName:string):void{
        const Swal = require('sweetalert2')
        const termino = Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exportación exitosa',
            showConfirmButton: false,
            timer: 1500
          })
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + EXCEL_EXT);
        termino

            }
    almacenar(variable: { pcodigo: any; category: { cnombre: string; }; brand: { bnombre: string; }; pdescripcion: string; precio_costo: any; pvalor: any; margen: any; utilidad: any; stock: { pstock: any; }; }, id: number):void{
        const checkboxpf =  window.document.getElementById("sanos" + id) as HTMLInputElement;
        if(checkboxpf.checked == false){
            this.x.splice(id, 1)
        }else{
            const dato = {
                Codigo: variable.pcodigo,
                Nombre: variable.category.cnombre +''+variable.brand.bnombre + '' + variable.pdescripcion,
                Costo: variable.precio_costo,
                Précio: variable.pvalor,
                Margen: variable.margen,
                Utilidad: variable.utilidad,
                Unidades: variable.stock.pstock
            }
            this.x.push(dato)
        }

        console.log("datos ingresados", variable)
        console.log("esta fakse i trye", id)
        console.log("document", this.x)
    }

    async ProbandoCamara():Promise<void>{
      const granted = await this.permisos();
      BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()
      const busqueda = <HTMLInputElement> document.getElementById("codigo");
      busqueda.value="";
      this.buscarinventario =""
      console.log("si se cancela sera false", granted)
      if(!granted){
          this.mostrandoalerta();
          return;
      }
      const barcodes  = await BarcodeScanner.scan();
     // this.barcodes.push(...barcodes)
     console.log("el codigo impreso", barcodes);
      busqueda.value = barcodes.barcodes[0].rawValue
      this.buscarinventario = barcodes.barcodes[0].rawValue

    }
    async permisos(){
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera === 'granted' || camera === 'limited';
    }
    async mostrandoalerta(){
      const alert = await this.alertController.create({
        header: 'Permission denied',
        message: 'Please grant camera permission to use the barcode scanner.',
        buttons: ['OK'],
      });
      await alert.present();
    }

    ingresoCodigo(){
        console.log("algo cambio",this.buscarinventario)
    }
}
