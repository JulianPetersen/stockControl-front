export interface User {
    username: string,
    email:string,
    password:string
    roles:string;
}


export interface loginResponse{
    token:string
    userFound:string
}