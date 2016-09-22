// --- Model ------------------------------------------

interface IBaseEntity {
  id: number;
};

interface IPerson extends IBaseEntity {
  firstName: string;
  lastName: string;
}

export interface IVisit extends IBaseEntity {
  date: Date;
  description: string;
};

export interface IPetType {
  name: string;
};

export interface IPet extends IBaseEntity {
  name: string;
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
