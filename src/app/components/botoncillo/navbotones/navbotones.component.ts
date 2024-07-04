import { create } from 'xmlbuilder2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Categories } from '../../Modulos/Categories';
import { Marca } from '../../Modulos/Marca';
import * as devTools from 'devtools-detect';
import { Categorias } from '../../Modulos/Categorias';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { SqliteService } from 'src/app/Service/sqlite.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Component({
  selector: 'app-navbotones',
  templateUrl: './navbotones.component.html',
  styleUrls: ['./navbotones.component.scss']
})
export class NavbotonesComponent implements OnInit, OnDestroy{
  public ingresarproducto: FormGroup | undefined;
  public frmsqliteprod:FormGroup;
  public closeResult: string | undefined;
  public categoriaProducto: string | undefined;
  public marcaProducto: string | undefined;
  public nombreProducto:string | undefined;
  public Frmproducto!: FormGroup;
  public prdiva: string | undefined;

  public categorias: Categories[] | undefined;
  public marcas: Marca[] | undefined;
  public ventarapida: FormGroup;
  public mediopago = ["efectivo", "tarjeta"]
  public preciov:number=0;
  public objeckino= []
  private unsubscribe$ = new Subject<void>();
  public categoriasqlite:Categorias | undefined
  public envsqlitecatego:Observable<Categorias> | undefined
  private infocartego:Subject<Categorias> = new BehaviorSubject<Categorias | any>(null);
  marsqlite: Marca | undefined;
  //categorysqlite!: Observable<Categorias | any>;
  categorysqlite: any[]=[]
  informacionobtenida: any;
  get pactivado() {return this.Frmproducto.get('pactivado'); }
  get pdescripcion() { return this.Frmproducto.get('pdescripcion'); }
  get pdetalle() { return this.Frmproducto.get('pdetalle'); }
 // get pcodigo() { return this.Frmproducto.get('pcodigo'); }
  get pstock() {return this.Frmproducto.get('pstock'); }
  get pvalor() { return this.Frmproducto.get('pvalor'); }
  get category_id() { return this.Frmproducto.get('categorias'); }
  get stock_lost() {return this.Frmproducto.get('stock_lost'); }
  get stock_security() {return this.Frmproducto.get('stock_security'); }
  get provider_id() {return this.Frmproducto.get('provider_id'); }
  get tax_id() {return this.Frmproducto.get('tax_id'); }
    //get brand_id() {return this.Frmproducto.get('brand_id'); }
    get pvneto() { return this.Frmproducto.get('pvneto'); }
    get margen (){return this.Frmproducto.get('margen')}
    get utilidad () {return this. Frmproducto.get('utilidad')}
    get precio_provider(){return this.Frmproducto.get('precio_provider')}
    get preciva(){return this.Frmproducto.get('preciva')}
    get precio(){return this.frmsqliteprod.get('precio')}
    get pcodigo(){return this. frmsqliteprod.get('pcodigo')}
    get nombre(){return this.frmsqliteprod.get('nombre')}
    get cantidad(){return this.frmsqliteprod.get('cantidad')};
    get categoryid(){return this.frmsqliteprod.get('categoryid')}
    get fechavenci(){return this.frmsqliteprod.get('fechavenci')}
    isSupported = false;
    barcodes: Barcode[] = [];
  constructor(
    private modalService: NgbModal,
     private fb: FormBuilder,
     private fb2:FormBuilder,
     private sqlite3:SqliteService,
     public loadingController: LoadingController,
     private alertController: AlertController,
     private sqliteconnecion:SQLite

      ) {

        this.frmsqliteprod = this.fb.group({
          precio: new FormControl(0),
          pcodigo: new FormControl(''),
          nombre: new FormControl(''),
          precioiva:new FormControl(''),
          fechain:new FormControl(''),
          cantidad:new FormControl(0),
          categoryid:new FormControl(0),
          fechavenci:new FormControl('')

        })
   /* this.Frmproducto = this.fb.group({
      pcodigo: new FormControl( '', [Validators.required]),
      pdescripcion: new FormControl(''),
      pdetalle: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]),
      pvalor: new FormControl(0, [Validators.required]),
      provider_id: new FormControl('', [Validators.required]),
      precio_provider: new FormControl(''),
      category_id: new FormControl ('', [Validators.required]),
      pactivado: new FormControl(false),
      tax_id: new FormControl(1),
      brand_id: new FormControl('', [Validators.required]),
      piva: new FormControl(0),
      utilidad: new FormControl(''),
      margen: new FormControl(''),
      stock: new FormGroup( {
          pstock: new FormControl( ''),
          stock_lost: new FormControl( '' ),
          stock_security: new FormControl(''),
      }),
      date_expiration: new FormGroup({
        fecha_vencimiento: new FormControl(''),
         stock_expiration: new FormControl(''),
         product_id: new FormControl(0)
      }),
      pvneto: new FormControl(0),
      preciva: new FormControl(0)
    })*/


    this.ventarapida = this.fb2.group({
      codigo_producto: new FormControl(''),
      nombre_product: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      precio: new FormControl('', [Validators.required]),
      medio_pago: new FormControl('', [Validators.required])
   })
  }

  cargarCategorias(){
    this.loadingController.create({
      message: 'Cargando...'
  }).then((response: { present: () => void; }) => {
    response.present();
  });
  this.loadingController.dismiss().then(()=> {

  })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  }


 async ngOnInit(){


  BarcodeScanner.isSupported().then((result)=>{
    console.log("se permite esto", result.supported);
    this.isSupported = result.supported;
  })
  BarcodeScanner.installGoogleBarcodeScannerModule()

  }




   navegador_habierto(){
    if(devTools.default.isOpen == true){
      window.location.href = "https://errorconsole.herokuapp.com/"
    }
}

  async buscarimpuesto() {
}

  datos(pvalor: { value: null; }) {
    // @ts-ignore
document.getElementById('tax_id').value = '';
// @ts-ignore
document.getElementById('iva2').value = '';
if (pvalor.value != null) {
    // @ts-ignore
  window.document.getElementById('tax_id').disabled = false;


} else {
  // @ts-ignore
  window.document.getElementById( 'tax_id' ).disabled = true;
  // @ts-ignore
  window.document.getElementById('tax_id').value = '';
}
}
openSettings = async () => {
  await BarcodeScanner.openSettings();
};
 startScan = async ()=>{
  this.openSettings()
  document.querySelector('body')?.classList.add('barcode-scanner-active');
  const listener = await BarcodeScanner.addListener('barcodeScanned',async result =>{result.barcode});
  await BarcodeScanner.startScan();
}
scan = async () =>{
  const { barcodes } = await BarcodeScanner.scan({
    formats:[BarcodeFormat.QrCode, BarcodeFormat.Codabar],
  })
  return barcodes;
}
scannsigleBarcode = async () => {
  return new Promise(async resolve => {
    document.querySelector('body')?.classList.add('barcode-scanner-active')

    const listener = await BarcodeScanner.addListener('barcodeScanned',async result => {await listener.remove();
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
    await BarcodeScanner.stopScan();
    resolve(result.barcode)
    })
  })
}
 isTorchAvailable = async () => {
  const { available } = await BarcodeScanner.isTorchAvailable();
  return available;
};





calImp(imp: any, valor: { value: string; }): number {


  const n2 = parseInt(valor.value);
  const multiva = ( n2 *( 19/100 ));
  const resultiva: number = multiva / 100;
  this.prdiva = multiva.toFixed(0)
 const ivaprecio =  (parseInt(multiva.toFixed(0)) + parseInt(this.Frmproducto.value.pvalor))
  this.Frmproducto.controls['preciva'].setValue(ivaprecio)

  // @ts-ignore
  return resultiva;
}


  openModal(content1: any){


    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    try{
      this.sqlite3.coneccion.executeSql("SELECT rowid as id, cnombre FROM categorias",[])
     .then((result)=>{
       console.log('categorias ',result)
       for(let i=0; i<result.rows.length;i++){
         this.categorysqlite.push(result.rows.item(i))
       }
     })
   }
   catch(ex){
   console.log("un erro a ocurrido", ex)
   }
  }
  async ProbandoCamara():Promise<void>{
    const granted = await this.permisos();
    BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()

    this.frmsqliteprod.controls['pcodigo'].setValue("");
    console.log("si se cancela sera false", granted)
    if(!granted){
        this.mostrandoalerta();
        return;
    }
    const barcodes  = await BarcodeScanner.scan();
   // this.barcodes.push(...barcodes)
   console.log("el codigo impreso", barcodes);
   this.frmsqliteprod.controls["pcodigo"].setValue(barcodes.barcodes[0].rawValue)  }
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
  open2( content2: any){
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    const pdescripcion = <HTMLInputElement> window.document.getElementById('pdescripcion')
    const pcodigo = <HTMLInputElement> window.document.getElementById('pcodigo')
    const categoria = <HTMLInputElement> window.document.getElementById('categoria')
    const marca = <HTMLInputElement> window.document.getElementById('marca')
    const precio = <HTMLInputElement> window.document.getElementById('valor')
    const stock = <HTMLInputElement> window.document.getElementById('stock')
    const fecha = <HTMLInputElement> window.document.getElementById('fecha')
    const perdidas = <HTMLInputElement> window.document.getElementById('perdidas')
    pdescripcion.value = this.Frmproducto.value.pdescripcion
    pcodigo.value = this.Frmproducto.value.pcodigo
    categoria.value = this.Frmproducto.value.category_id.cnombre
    marca.value = this.Frmproducto.value.brand_id.bnombre
    precio.value = this.Frmproducto.value.pvalor
    stock.value = this.Frmproducto.value.stock.pstock
    perdidas.value = this.Frmproducto.value.stock.stock_lost
  }

  open3(content3: any){
    this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open4(content4: any){
    this.modalService.open(content4, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open5(content5: any){
    this.modalService.open(content5, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open6(content6: any){
    this.modalService.open(content6, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open7(content7: any){
    this.modalService.open(content7, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open8(content8: any){
    this.modalService.open(content8, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open9(content8: any){
    this.modalService.open(content8, { ariaLabelledBy: 'modal-basic-title',size: <any>'xl '   }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    const pdescripcion = <HTMLInputElement> window.document.getElementById('pdescripcion')
    const pcodigo = <HTMLInputElement> window.document.getElementById('pcodigo')
    const categoria = <HTMLInputElement> window.document.getElementById('categoria')
    const marca = <HTMLInputElement> window.document.getElementById('marca')
    const precio = <HTMLInputElement> window.document.getElementById('valor')
    const stock = <HTMLInputElement> window.document.getElementById('stock')
    const fecha = <HTMLInputElement> window.document.getElementById('fecha')
    const perdidas = <HTMLInputElement> window.document.getElementById('perdidas')
    pdescripcion.value = this.Frmproducto.value.pdescripcion
    pcodigo.value = this.Frmproducto.value.pcodigo
    categoria.value = this.Frmproducto.value.category_id.cnombre
    marca.value = this.Frmproducto.value.brand_id.bnombre
    precio.value = this.Frmproducto.value.pvalor
    stock.value = this.Frmproducto.value.stock.pstock
    perdidas.value = this.Frmproducto.value.stock.stock_lost
  }
  open10(content10: any){
    this.modalService.open(content10, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open0(content0: any){
    this.modalService.open(content0, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  async Guardaregistro(){

    const fecha = new Date();
    let dia = fecha.getDate() ;
    let mes = fecha.getMonth();
    let año = fecha.getFullYear();
    let hoy = año + '/'+ mes+ '/' + dia;
    const data = {
      pcodigo:this.frmsqliteprod.value.pcodigo,
      nombre: this.frmsqliteprod.value.nombre,
      precio:this.frmsqliteprod.value.precio,
      fechain:hoy.toString(),
      cantidad:this.frmsqliteprod.value.cantidad,
      categoryid:this.frmsqliteprod.value.categoryid.id,
      fechavenci:this.frmsqliteprod.value.fechavenci
    }

    if(!this.sqlite3.coneccion.open()){
      this.sqliteconnecion.create(   {
        name:'data.db',
        location:'default',
      })
    }
      if(data.pcodigo){
        this.frmsqliteprod.value.fechain = hoy.toString()
      //  this.wbde.intProduct({pcodigo:this.frmsqliteprod.value.pcodigo,nombre:this.frmsqliteprod.value.nombre,
        //  precio:this.frmsqliteprod.value.precio,precioiva:100,fechain:this.frmsqliteprod.value.fechain,cantidad:this.frmsqliteprod.value.cantidad
          //,categoryid:this.frmsqliteprod.value.categoryid.id, fechavenci:this.frmsqliteprod.value.fechavenci.toString()})
          this.sqlite3.coneccion.executeSql('INSERT INTO productos VALUES (?,?,?,?,?,?,?,?)',[data.pcodigo,
            data.nombre,
            data.precio,
            1,
            data.fechain,
            data.cantidad,
            data.categoryid,
            data.fechavenci])
          .then((result)=>{if(result){
            this.frmsqliteprod.reset();
            alert('Se guardo correctamente')}})
          .then(()=>{this.sqlite3.llamarProductos()})
          .catch((error)=>{alert('Hay un error al intentar guardar' +  error)});
      }else{
        alert("El código de barra no puede estar vacío")
      }

    /*
    if (this.Frmproducto.valid) { return;}
    console.log(this.Frmproducto)
    console.log(form)
    if(this.Frmproducto.value.category_id.id){console.log('bien')}else{console.log('mal')}
    try {
      this.Frmproducto.value.category_id = this.Frmproducto.value?.category_id?.id;
      this.Frmproducto.value.provider_id = this.Frmproducto.value?.provider_id?.id;
      this.Frmproducto.value.tax_id = this.Frmproducto.value?.tax_id?.id || 1;
      this.Frmproducto.value.brand_id = this.Frmproducto.value?.brand_id?.id;
      this.Frmproducto.value.stock.product_id = 0;
      this.Frmproducto.value.date_expiration.stock_expiration = 0,
      this.Frmproducto.value.stock.product_id = 0;
      this.Frmproducto.value.date_expiration.product_id = 0;
    this.servi.guardarproductos( this.Frmproducto )
      this.wbde.mensajeriaP.subscribe(res => {
        console.log(res)
        if(res){
          this.wbde
        }
      })
        this.wbde.mensajeria.asObservable()
    } catch (error) {
      console.log('muestra',error)
    }

*/
  }

  BusCode(){
    // cordova.plugins.barcodeScanner.scan(
     // function (result) {

       //    var variable =   document.getElementById("codigo")

         //  variable.value = result.text
       //},
      //function (error) {
        //  alert("Scanning failed: " + error);
      //},
      //{
        //  preferFrontCamera : true, // iOS and Android
          //showFlipCameraButton : true, // iOS and Android
          //showTorchButton : true, // iOS and Android
          //torchOn: true, // Android, launch with the torch switched on (if available)
          //saveHistory: true, // Android, save scan history (default false)
          //prompt : "Place a barcode inside the scan area", // Android
          //resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          //formats : "QR_CODE,PDF_417,UPC_A, UPC_E,EAN_8,EAN_13,CODE_128", // default: all but PDF_417 and RSS_EXPANDED
          //orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          //disableAnimations : true, // iOS
          //disableSuccessBeep: false // iOS and Android
      //}
   //);
  }

//Obterner las utilidades-
  Obutildiad(frm: any){

    const resultado = (this.Frmproducto.value.precio_provider * (this.Frmproducto.value.margen/100));
    const valor = (this.Frmproducto.value.precio_provider + resultado)
    //frm.value.pvalor = parseInt(resultado.toFixed(0));
  //  frm.value.utilidad =  parseInt((resultado - frm.value.pvalor).toFixed(0));
    this.Frmproducto.controls['pvalor'].setValue(parseInt(valor.toFixed(0)));
    const dato = resultado.toFixed(0)
    this.Frmproducto.controls['utilidad'].setValue( resultado)

 }


}
