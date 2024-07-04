import { WebsocketService } from 'src/app/Service/websocket.service';
import {Component, OnInit} from '@angular/core';
import {DetalleVoucher} from '../../Modulos/DetalleVoucher';
import {Observable, Subscription} from 'rxjs';
import {XMLBuilder} from 'xmlbuilder2/lib/interfaces';
import {create} from 'xmlbuilder2';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HoraActualService, valorReloj} from '../../../Service/hora-actual.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { VentProd } from '../../Modulos/VentProd';
import { ventash } from '../../Modulos/ventash';
import { SqliteService } from 'src/app/Service/sqlite.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  public selected = [];
    p: number = 0;
  boletas: Observable<DetalleVoucher[]> | undefined;
  ventasemit:any[]=[] ;
    datos:any[] = [];
    cortar!: any[] ;
    closeResult = '';
    rasonSoci:string = '';
    rutEmisor = '';
    tipodeDoc = '';
    cantidadDoc: number | undefined;
    private datos$: Observable<valorReloj> | undefined;
    private fecha!: Subscription;
    hora: string | undefined;
    // tslint:disable-next-line:variable-name
    fecha_resolucion = '';
    // tslint:disable-next-line:variable-name
    fecha_tributaria = '';
    valortotalneto = [];
    valortotalNetos = [];
    TotalValorIVA = [];
    totalTodo = [];
    numeroresolu!: number;
    Nfolionotificacion!: number;
    moduloLLave!: string;
    exponentellave!: string;
    moduloCertificadoLLave!: string;
    exponenteCertificadoLLave!: string;
    rutEmisiorBoleta!: string;
    public fechaIni!: string;
    public fechaFin!: string;
    public ventsho!: Observable<ventash | any>
    public valorhoy:any
    // tslint:disable-next-line:max-line-length
    constructor(
         private modalService: NgbModal, public secoind: HoraActualService,
          private ngxspinner: NgxSpinnerService,
          private database:SqliteService ) { }
 async ngOnInit() {
    this.ngxspinner.show();
    //this.boletas = await this.bol.detalledeventa();
    //await this.informacionesLocal();
    this.emitirventas();
    this.datos$ = await this.secoind.getInfoReloj();
    this.fecha =  this.datos$.subscribe( x => {
         this.hora = x.diaymes + 'T' + x.hora.toString() + ':' + x.minutos + ':' + x.segundo;
         this.ngxspinner.hide();
    } );
    this.someMethodIThinkMightBeSlow()
 }
    emitirventas(){
      this.database.coneccion.executeSql("SELECT * FROM ventas",[]).
      then((result) => {
        for(let i =0; i<result.rows.lengt; i ++){
              this.ventasemit.push(result.rows.item(i))
        }
      })
    }

    agregaboleta(da: any) {
        const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
        const dproducto = [];
        const valornet = [];
        const valorIVA = [];
        const valorNeto = [];
        const valortotal = [];
        this.datos.push( da );
        this.cortar  = this.datos.filter((item, index) => {
                return this.datos.indexOf(item) === index;
            });


        for (const o of this.datos) {
                        dproducto.push(o.product);
                        valornet.push(o.product.pvalor);
                        valorNeto.push(o.product.pvneto);
                        valorIVA.push(o.product.piva);
                        this.valortotalneto = valornet.reduce(reducer);
                        this.TotalValorIVA = valorIVA.reduce(reducer);
                        this.valortotalNetos = valorNeto.reduce(reducer);
                        valortotal.push(this.valortotalneto, this.TotalValorIVA);
                        this.totalTodo = valortotal.reduce(reducer);

                    }
     this.cortar.map(res => res.product.pcodigo);
        this.cantidadDoc = this.cortar.length;
    }






    crearxml() {
        const xmlStr =`<?xml version="1.0" encoding="iso-8859-1"?>
\t\t\t<LibroCompraVenta xmlns="http://www.sii.cl/SiiDte" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SiiDte="http://www.sii.cl/SiiDte" >
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<EnvioLibro ID="ID_LIBRO_">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Caratula>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<RutEmisorLibro>${this.rutEmisor}</RutEmisorLibro>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<RutEnvia>${this.rutEmisor}</RutEnvia>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<PeriodoTributario>${this.fecha_tributaria}</PeriodoTributario>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<FchResol>${this.fecha_resolucion}</FchResol>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<NroResol>${this.numeroresolu}</NroResol>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TipoOperacion>VENTA</TipoOperacion>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TipoLibro>Libro de boletas</TipoLibro>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TipoEnvio>${this.tipodeDoc}</TipoEnvio>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<FolioNotificacion>${this.Nfolionotificacion}</FolioNotificacion>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Caratula>
\t\t\t\t\t\t\t\t\t\t\t\t\t<ResumenPeriodo>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TotalesPeriodo>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TpoDoc>39</TpoDoc>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TotDoc>${this.cantidadDoc}</TotDoc>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TotMntExe>${this.valortotalNetos}</TotMntExe>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TotMntNeto>${this.valortotalneto}</TotMntNeto>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TotMntIVA>${this.TotalValorIVA}</TotMntIVA>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TotMntTotal>${this.totalTodo}</TotMntTotal>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t</TotalesPeriodo>
\t\t\t\t\t\t\t\t\t\t\t\t\t</ResumenPeriodo>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${this.detalleCmpr().map(res => res ) }
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TmstFirma>${this.hora}</TmstFirma>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t</EnvioLibro>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<AlforitTranform>SHA1withRSA</AlforitTranform>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<AlgoritDiges>${this.moduloCertificadoLLave}</AlgoritDiges>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ValorDiges>${this.exponenteCertificadoLLave}</ValorDiges>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Signature>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<SignatureValue>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ValorFrm>15.000</ValorFirm>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</SignatureValue>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<KeyInfo>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<KeyValue>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<RSAKeyValue>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Modulo>${this.moduloLLave}</Modulo>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Exponente>${this.exponentellave}</Exponente>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</RSAKeyValue>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</KeyValue>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</KeyInfo>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</LibroCompraVenta>
`;
        let doc: XMLBuilder;
        doc = create( xmlStr ).dec( {version: '1.0', encoding: 'ISO-8859-1'} );
// append a 'baz' element to the root node of the document
        doc.root().ele('baz');
        const xml = doc.end({ prettyPrint: true });


        const filename =  this.fecha_resolucion + '.xml';
        const text =  xml;
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(text));

        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);
        console.log("el elemento", document.body.appendChild(element))
        element.click();

        document.body.removeChild(element);
        this.detalleCmpr();
        console.log('detalle de la funcion', this.detalleCmpr().map(res => res.toString()) );
    }


    pruebaenvioXML(){
        const prueb =`<?xml version="1.0" encoding="iso-8859-1"?>
<LibroCompraVenta xmlns="http://www.sii.cl/SiiDte" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SiiDte="http://www.sii.cl/SiiDte" >
<EnvioLibro ID="ID_LIBRO_">
<Caratula>
<RutEmisorLibro>NNNNNN</RutEmisorLibro>
<RutEnvia>5555</RutEnvia>
<PeriodoTributario>55555</PeriodoTributario>
<FchResol>55555555</FchResol>
<NroResol>55555555</NroResol>
<TipoOperacion>VENTA</TipoOperacion>
<TipoLibro>Librodeboletas</TipoLibro>
<TipoEnvio>5555555</TipoEnvio>
<FolioNotificacion>55555555</FolioNotificacion>
</Caratula>
</EnvioLibro>
</LibroCompraVenta>`

var xml = 'data:text/xml;charset=utf-8,' + encodeURIComponent(prueb);
var byte = {nombreXML: btoa(xml)};
console.log(byte.nombreXML)

console.log("bytes", byte.nombreXML)
console.log("decodificado",atob(byte.nombreXML))

            }


    detalleCmpr() {
        const detalle = [];
        for (const o of this.cortar) {
            console.log('detalle del o', o);
            detalle.push( `
         <Detalle>
            <TpoDoc>39</TpoDoc>
             <NroDoc>10</NroDoc>
            <TasaImp>19%</TasaImp>
            <FchDoc>${o.fecha_emision}</FchDoc>
            <RutEmi>${this.rutEmisor} </RutEmi>
             <TipoProd>${o.product.category.cnombre}</TipoProd>
             <RznSoc>${this.rasonSoci}</RznSoc>
             <MntNeto>1422876</MntNeto>
             <MntIVA>${o.product.piva}</MntIVA>
             <MntTotal>${o.voucher.vtotal}</MntTotal>
             ${o.product.id}
        </Detalle>`);
        }

        console.log('Detalle comprado', detalle[0]);
        console.log('Detalle comprado 2', detalle[1]);

        return detalle;
    }


    open(content: any) {
        this.fecha.unsubscribe();

        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

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

    camarabardcode2(){

    }

     someMethodIThinkMightBeSlow() {
        const startTime = performance.now();

        // Do the normal stuff for this function

        const duration = performance.now() - startTime;
        console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
    }
}
