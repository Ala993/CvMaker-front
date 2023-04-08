

export interface IUser {
  id?: string;
  login?: string;
  password?: string;
  firstName?: any;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  activationKey?: string;
  resetDate?: Date;
  resetKey?: string;
  createdBy?: string;
  createdDate?: Date;
  phoneNumber1?: string;
  phoneNumber2?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  authorities?: string[],

}

export class User implements IUser {
  constructor(public id?: string,
              public login?: string,
              public password?: string,
              public firstName?: any,
              public lastName?: string,
              public email?: string,
              public activated?: boolean,
              public langKey?: string,
              public activationKey?: string,
              public resetDate?: Date,
              public resetKey?: string,
              public createdBy?: string,
              public createdDate?: Date,
              public lastModifiedBy?: string,
              public phoneNumber1?: string,
              public phoneNumber2?: string,
              public lastModifiedDate?: Date,
              public authorities?: string[],

  ) {
    this.id = id ? id : null;
    this.firstName = firstName ? firstName : null;
    this.lastName = lastName ? lastName : null;
    this.login = login ? login : null;
    this.email = email ? email : null;
    this.password = password ? password : null;

  }
}
