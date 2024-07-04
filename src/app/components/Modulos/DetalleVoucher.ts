import {Voucher} from "./Voucher";
import {Productos} from "./Productos";
export class DetalleVoucher {
    id!: number;
    dvcantidad!: number;
    dvprecio!: number;
    voucher_id!: number;
    product_id!: number;
    product!: Productos;
    voucher = new Voucher();
    fecha_emision!: string;
    hora_emision!: string;
    created_at!: string;
}
