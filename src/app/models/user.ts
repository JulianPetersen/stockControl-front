export interface User {
    username: string,
    email:string,
    password:string
    roles:string;
    nombreSalon?:string;
   
}


export interface loginResponse{
    token:string
    firstTime:boolean
    userId:string

}