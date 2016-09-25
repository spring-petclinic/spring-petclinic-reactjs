import { IRouter } from 'react-router';

// ------------------------------------ ROUTER ------------------------------------
export interface IRouterContext {
  router: IRouter;
};

// ------------------------------------ UTIL --------------------------------------
export type IHttpMethod = 'POST' | 'PUT' | 'GET';

// ------------------------------------ FORM --------------------------------------
export type IOnChangeHandler = (name: string, value: string) => void;

// ------------------------------------ MODEL .------------------------------------

interface IBaseEntity {
  id: number;
  isNew: boolean;
};

interface INamedEntity extends IBaseEntity {
  name: string;
}

interface IPerson extends IBaseEntity {
  firstName: string;
  lastName: string;
}

export interface IVisit extends IBaseEntity {
  date: Date;
  description: string;
};

export interface IPetType extends INamedEntity {
};

export interface IPet extends INamedEntity {
  birthDate: Date;
  type: IPetType;
  visits: IVisit[];
};

export interface IOwner extends IPerson {

  address: string;
  city: string;
  telephone: string;
  pets: IPet[];
};

export interface ISpecialty extends INamedEntity {
};

export interface IVet extends IPerson {
  specialties: ISpecialty[];
};

// ------------------------------------ ERROR ------------------------------------
export interface IFieldError {
  field: string;
  code: string;
  message: string;
}

interface IFieldErrors {
  [index: string]: IFieldError;
};

export interface IError {
  fieldErrors: IFieldErrors;
}
