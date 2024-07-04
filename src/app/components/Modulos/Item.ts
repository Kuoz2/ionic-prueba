import {date_expiration, Stock} from "./Productos";
import {Categories} from "./Categories";
import {Marca} from "./Marca";

export class Item {
    pvactivacioncatalogo!: boolean;
    pactivado!: boolean;
    category_id!: Categories[];
    ppictures: any;
    id!: number;
    pdescripcion!: string;
    pcodigo!: number;
    pdetalle!: string;
    pvalor!: number;
    stock_id!: Stock[];
    stock = new Stock();
    cantidad!:number;
    quantity!: number;
    category = new Categories()
    brand = new Marca()
    piva!: number
    // tslint:disable-next-line:variable-name
    date_expiration = new date_expiration();
    Sinventario: boolean = false;
}

export class Item2{
    actualizado_stockm!: number;
    cambio_fecha!: boolean;
    cantidad_cambiadas!: number;
    fecha_vencimiento!: string;
    id!: number;
    product = new Item;
    product_id!: number;
    stock_expiration!: number;
    quantity!: number;
    Sinventario!: boolean;
}

export interface IItem {
    id:number,
    img:string,
    name:string,
    description:string,
    price:number,
    quantity:number
}
