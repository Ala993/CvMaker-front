import { Collaborator } from "./collaborator.model";
import { Experience, IExperience } from "./experience.model";
import { Skill } from "./skill.model";
import { IStudy, Study } from "./study.model";

export interface ICv {
    id?: string,
    title?: string,
    address?: string,
    phoneNumber?: number,
    postalCode?: number,
    image?: any;
    email?: string,
    experiences?: IExperience[],
    skills?: Skill[],
    studies?: IStudy[],
    collaborator?: Collaborator
}


export class Cv implements ICv {
    constructor(
        public id?: string,
        public title?: string,
        public address?: string,
        public phoneNumber?: number,
        public postalCode?: number,
        public email?: string,
        public experiences?: Experience[],
        public skills?: Skill[],
        public studies?: Study[],
        public image?: any,
        public collaborator?: Collaborator
    ) {
        this.experiences = [];
        this.skills = [];
        this.studies = [];
    }


}