export interface User {
    nombre?:string,
    apellido?:string,
    username?: string,
    email?:string,
    password?:string
    roles?:string;
    nombreSalon?:string;
    isModerator?:boolean
    idAdmin?:string
}


export interface loginResponse{
    _id?:string
    nombre?:string,
    apellido?:string,
    username:string
    token:string
    firstTime:boolean
    userId:string
    isModerator:boolean,
    idAdmin:string
    nombreSalon:string
    email:string
    userActive?:boolean

}