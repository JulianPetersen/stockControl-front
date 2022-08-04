export interface Products {
    _id:string;
    name:string;
    category:string;
    price:number;
    imgUrl?:number;
    stock:number
}


export interface PostProduct {

    name:string;
    category:string;
    price:number;
    image?:File;
    stock:number
}
