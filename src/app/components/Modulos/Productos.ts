import {Categories} from './Categories';
import {Marca} from './Marca';

export class Productos {
    pvactivacioncatalogo!: boolean;
    pactivado!: boolean;
    category!: Categories[];
    category_id!: Categories[];
    ppicture: any;
    margen!: number;
    utilidad!: number;
    id!: number;
    pdescripcion!: string;
    pcodigo!: number;
    pdetalle!: string;
    pvalor!: number;
    precio_provider!: number;
    precio_costo!: number;
    // tslint:disable-next-line:variable-name
    stock = new Stock();
    cantidad!: number;
    quantity!: number;
    munidades!: number;
    piva!: number;
    vpcventa!: number;
    brand!: Marca;
    categoria!: Categories;
    categorie = new Categories();
    pvneto!: number;
    //date_expirations_id: number;
    stock_id!: number;
    // tslint:disable-next-line:variable-name
    //date_expiration =  new date_expiration();
}


export class Stock {
    id!: number;
    pstock!: number;
    // tslint:disable-next-line:variable-name
    stock_lost!: number;
    // tslint:disable-next-line:variable-name
    stock_security!: number;
    product_id!: number;
}

// tslint:disable-next-line:class-name
export interface stock2 {
    id: number;
    pstock: number;
    pstockcatalogo: number;
    stock_lost: number;
    stock_security: number;
}

// tslint:disable-next-line:class-name
export class date_expiration {
    id!: number;
    // tslint:disable-next-line:variable-name
    fecha_vencimiento!: string;
    // tslint:disable-next-line:variable-name
    stock_expiration!: number;
    // tslint:disable-next-line:variable-name
    cambio_fecha!: boolean;
    // tslint:disable-next-line:variable-name
    cantidad_cambiadas!: number;
    // tslint:disable-next-line:variable-name
    actualizado_stockm!: boolean;
    // tslint:disable-next-line:variable-name
    product_id!: number;
}
