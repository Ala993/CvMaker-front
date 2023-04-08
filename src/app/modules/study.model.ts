export interface IStudy {
    id?: string,
    title?: string,   
    location?: string,   
    establishment?: string,   
    startDate?: Date,   
    endDate?: Date,  
    description?: string 
}


export class Study implements IStudy {
    constructor(
        public id?: string,
        public title?: string,   
        public location?: string,   
        public establishment?: string,   
        public startDate?: Date,   
        public endDate?: Date,  
        public description?: string 
    ){}
    
  
}