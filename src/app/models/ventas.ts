import { Products } from "./products";

export interface Ventas {
    
    producto:string,
    monto:number,
    metodoPago:string,
    fecha:string
}

export interface responseVenta {
    _id:string,
    producto:Products,
    monto:number,
    metodoPago:string,
    fecha:string
}
