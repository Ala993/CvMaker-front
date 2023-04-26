export interface IUserPassword {
    oldPassword?: string,   
    newPassword?:string
}


export class UserPassword implements IUserPassword {
    constructor(
       
        public oldPassword?: string,
        public newPassword?:string
    ){}
    
  
}