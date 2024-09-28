export const DASHBOARD = "/";
export const OWNERS = "/owners";
export const OWNERS_FIND = `${OWNERS}/find`;
export const OWNERS_ADD_NEW = `${OWNERS}/new`;
export const GET_OWNER = `${OWNERS}/:id`;
export const EDIT_OWNER = `${GET_OWNER}/edit`;

export const PET_NEW_FORM = `${GET_OWNER}/pets/new`;
export const GET_PET = `${GET_OWNER}/pets/:petId`;
export const PET_EDIT_FORM = `${GET_PET}/edit`;

export const PET_VISITS = `${GET_PET}/visits/new`;

export const VETERINARIANS = "/veterinarians";
