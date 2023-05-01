import { IUser, User } from "./user.model";

export interface IHumanRessource {
    id?: string,
    user?: IUser,   
}


export class HumanRessource implements IHumanRessource {
    constructor(
        public id?: string,
        public user?: User,
    ){
        this.user = new User();
    }
    
  
}