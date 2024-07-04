import { Stock } from "./Productos";

export class ProductoActualizar {
    margen!:number;
    utilidad!:number;
    id!: number;
    pdescripcion!: string;
    pcodigo!: string;
    pdetalle!: string;
    pvalor!: number;
    precio_provider!:number;
    stock = new Stock();

}