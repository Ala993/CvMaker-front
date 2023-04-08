import { Cv, ICv } from "./cv.model";
import { IUser, User } from "./user.model";

export interface ICollaborator {
    id?: string,
    user?: IUser,   
    cv?:ICv
}


export class Collaborator implements ICollaborator {
    constructor(
        public id?: string,
        public user?: User,
        public cv?:Cv
    ){
        this.user = new User();
        this.cv = new Cv();
    }
    
  
}