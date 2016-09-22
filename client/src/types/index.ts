/** Basic routing  */
export interface IRedirectLocationState {
  redirect: string;
}

/** Contact entity  to send to server */
export interface IRequestContactEntity {
  name: string;
  email?: string;
  zipcode: number;
  city: string;
}
/** "Whole" Contact entity  as received from server */

export interface IContact extends IRequestContactEntity {
  pk: string;
}

/** substate for contacts reducer */
export type IContactsState = IContact[];

/** substate for selectedContact reducer */
export interface ISelectedContactState {
  pk?: string;
  editing?: boolean;
  isNew?: boolean;
};

export interface IAuthState {
  // Token and username as recevied from server. Set when successfully logged in
  username?: string;
  authorization?: string;
  error?: string; // set when authentication fails. will be cleared, when user has successfully been authenticated
}

export interface IMessagesState {
  error?: string;
  success?: string;
}

export type IFilterState = string;

/** overall state. 
 * 
 * Is this really needed? 
 * Intersection types could be an alternative:https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export interface IGlobalState {
  contacts: IContactsState;
  auth: IAuthState;
  filter: IFilterState;
  messages: IMessagesState;
  selectedContact: ISelectedContactState;
}

// stolen from @DJCordhose: http://djcordhose.github.io/react-intro-live-coding/2016_jsunconf.html#/12
export type IAction<ActionType, PayloadType> = {
  type: ActionType,
  payload: PayloadType
}

// ---- CONTACTS 
// interface IFetchContactsSuccessAction {
export type IFetchContactsSuccessAction = IAction<'FETCH_CONTACTS_SUCCESS', IContact[]>;
export type IContactsAction = IFetchContactsSuccessAction | IAction<'SAVE_CONTACT_SUCCESS', IContact>;

// ---- SELECTED CONTACT ---
export type ISelectedContactAction = IAction<'SET_EDITING', boolean>;

// ---- FILTER ----
export type IFilterActionTypes = 'SET_FILTER';
export type IFilterAction = IAction<IFilterActionTypes, string>;

// ---- AUTH ----
export type IAuthActionTypes = 'LOGIN_SUCCESS' | 'LOGIN_FAILED';
export interface IAuthentication { username: string; password: string; };
export interface IAuthorization { username: string; authorization: string; };
export type IAuthAction = IAction<IAuthActionTypes, IAuthorization>;
