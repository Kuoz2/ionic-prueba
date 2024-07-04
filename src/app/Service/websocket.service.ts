import { EventEmitter, Injectable } from '@angular/core';
import {Socket} from  'ngx-socket-io'
import { Observable, Subject } from 'rxjs';
import { VentProd } from '../components/Modulos/VentProd';
import { ventash } from '../components/Modulos/ventash';
import { Vent } from '../components/Modulos/Vent';
import { Produ } from '../components/Modulos/Produ';
import { Marca } from '../components/Modulos/Marca';
import { Categorias } from '../components/Modulos/Categorias';
import { pedido } from '../components/Modulos/pedido';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends Socket {

  public set categoria(_value: Categorias) {
  }
  marca!: Marca;
  produ:Produ | undefined;
  fech:Produ | undefined
  produas:Observable<Produ> | undefined
  vent:Vent | undefined;
  ventH:ventash | undefined
  produfind:any
  ventprod:VentProd | undefined;
  prueba:pedido | undefined;
  pruebaarreg: Produ[] = []
  fechasencontra: Produ[] = []
  categoriarreglo:Categorias[] = []
  public enviafechas=new Subject<Produ>();
  private infoVent=new Subject<Vent>();
  public infoventH=new Subject<ventash>();
  private infoProd=new Subject<Produ>();
  public infoProdSel=new Subject<Produ>();
  private infoCate = new Subject<Categorias>();
  private infoMarca=new Subject<Marca>();
  private infoVenProd = new Subject<VentProd>();
  outEvebt: EventEmitter<any> = new EventEmitter();
  callback: EventEmitter<any> = new EventEmitter();
  Marcallback:  EventEmitter<any> = new EventEmitter();
  Bitacoraback: EventEmitter<any> = new EventEmitter();
  mensajeria: EventEmitter<any> = new EventEmitter();
  mensajeriaC: EventEmitter<any> = new EventEmitter();
  mensajeriaP:EventEmitter<any>= new EventEmitter();
  constructor(private cooki: CookieService) {super({
    url: '',
    //url:'https://crlproyecto.herokuapp.com',
    options:{}
  })
  this.Listen()
}
Listen(){
  return this.ioSocket.on('bdmensaje',(res:any) => {res})
}
escuchame(){
 return  this.ioSocket.on('mensajeria',( res:any ) => {this.mensajeria=res;})
}
data(){
}
enviarmensajeP(a:any){
  this.ioSocket.emit('mensajeP',a);
  return this.ioSocket.on('mensajeriaP', (res:any) => {return this.mensajeriaP.emit(res)})
}
insertarsqlite(a:any){
  this.ioSocket.emit('insertD', a)
  return this.ioSocket.on('dbguardada', (res:any) => { res})
}
intCategoria(a:any){
  this.ioSocket.emit('inprod',a)
  return this.ioSocket.on('grdCate',( res:any )=> {res})
}
busCategoria(): Observable<Categorias>{
  this.categoriarreglo.slice(0, this.categoriarreglo.length)
  this.ioSocket.emit('Scatego')
  this.ioSocket.on('Scategory', (res:Categorias) => {
  this.categoria = res
  this.categoriarreglo.push(res)
  this.infoCate.next(this.categoria)
})
 return this.infoCate.asObservable()
}
busMarca(): Observable<Marca>{
this.ioSocket.emit('Smarca');
this.ioSocket.on('Smarc', (res:Marca) => {
  this.marca=res
this.infoMarca.next(this.marca);
});
return this.infoMarca.asObservable();
}
busProd(): Observable<Produ>{
this.ioSocket.emit('Sproducto');
this.ioSocket.on('Sprodu', (res:Produ) => {
this.produ=res
this.pruebaarreg.push(res)
this.infoProd.next(this.produ);
});
return this.infoProd.asObservable()
}

  async Cambiocantidadprod(){

  this.ioSocket.emit('Cproducto')
 return await this.ioSocket.on('Dcproducto', (res:any) => {
  console.log('cantida de productos',res.contar)
 return res
  })
}

busfechas(): Observable<Produ>{
  this.fechasencontra.splice(0, this.fechasencontra.length)
  this.ioSocket.emit('selectfech');
  this.ioSocket.on('envifech', (res:Produ) => {
    this.fech = res
    this.fechasencontra.push(res)
          this.enviafechas.next(this.fech)
  })
  return this.enviafechas.asObservable()
}

findProd(a:any):Observable<any>{
  this.ioSocket.emit('findProd' , a);
  this.ioSocket.on('findProds', (res:any) => {
    this.produfind=res
  this.infoProd.next(this.produfind);
  });
  return this.infoProd.asObservable()
}
busVent():Observable<Vent>{
  this.ioSocket.emit('Sventas');
  this.ioSocket.on('Svent', (res:Vent) => {this.vent=res
  this.infoVent.next(this.vent);
})
return this.infoVent.asObservable()
}
ventasH():Observable<ventash>{
this.ioSocket.emit('ventashoy');
this.ioSocket.on('vtnh', (res:ventash) => {this.ventH = res
  console.log('ventas', res)
this.infoventH.next(this.ventH)
})
return this.infoventH.asObservable()
}
lasventas():Observable<VentProd>{
this.ioSocket.emit('busventa');
this.ioSocket.on('vtn', (res:VentProd) => {
  this.ventprod=res;
  this.infoVenProd.next(this.ventprod)
})
return this.infoVenProd.asObservable()
}
intMarca(a:any){
  this.ioSocket.emit('insMarc', a)
  return this.ioSocket.on('grdMarc', (res:any) => { res})
}
upMarca(a:any){
  this.ioSocket.emit('UPmarca',a)
}
Upcatego(a:any){
  this.ioSocket.emit('UPcategorias',a)
}
async Upproducto(a:any){
  this.ioSocket.emit('UPproducto',a);
  await this.busProd()
}
async intProduct(a:any){
  this.ioSocket.emit('insProd',a);
}
intVentas(a:any){
  this.ioSocket.emit('rventas', a)
  return this.ioSocket.on('ventin',(res:any )=> { res});
}
enviarsqlmensaje(){
  return this.ioSocket.on('bdmensaje', (res:any) => {res})
}
enviarmensajeC(a:any){
this.ioSocket.emit('mensajeC',a)
return this.ioSocket.on('mensajeriaC', (res:any) =>{return this.mensajeriaC.emit(res);})
}
 enviarmensaje(a:any){
  this.ioSocket.emit('mensaje',a)
 return  this.ioSocket.on('mensajeria', (res:any) => {return this.mensajeria.emit(res);});

}
eliminar(){
 return this.ioSocket.removeAllListeners( 'mensajeria')
}
eliminarP(){
  return this.ioSocket.removeAllListeners('mensajeriaP')
}

eliminarC(){
  return this.ioSocket.removeAllListeners('mensajeriaC')
}

emitEvent = (payload = {}) => {
  this.ioSocket.emit('event', payload)
}
emitEventMarca = (payload = {})=> {
  this.ioSocket.emit('marcaEvnt', payload)
}
emitBitacoraEvent = (payload = {})=> {
  this.ioSocket.emit('BitacoraEvent', payload)
}

}
