import { ISkill, Skill } from "./skill.model";

export interface ICvFilter {
    skills?: ISkill[]
}


export class CvFilter implements ICvFilter {
    constructor(
        public skills?:Skill[]
    ){
        this.skills = [];
    }
    
    
}