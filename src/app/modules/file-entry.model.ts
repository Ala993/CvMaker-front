export interface IFileEntry {
    id?: string,
    data?: any
}


export class FileEntry implements IFileEntry {
    constructor(
        public id?: string,
        public data?: any,
    ){}
    
  
}