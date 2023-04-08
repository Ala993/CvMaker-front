export interface IExperience {
    id?: string,
    startDate?: Date,
    endDate?: Date,
    company?: string,
    position?: string,
    description?:string
}


export class Experience implements IExperience {
    constructor(
        public id?: string,
        public startDate?: Date,
        public endDate?: Date,
        public company?: string,
        public position?: string,
        public description?:string
    ){}
    
  
}