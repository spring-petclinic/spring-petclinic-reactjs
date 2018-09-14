import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';

import initialAppState from '../state';

const AJAX_ERROR = 'owner/AJAX_ERROR';
const FETCH_OWNERS = 'owner/FETCH_OWNERS';
const FETCH_OWNER_BY_ID = 'owner/FETCH_OWNER_BY_ID';
const UPDATE_OWNERS = 'owner/UPDATE_OWNERS';
const UPDATE_SELECTED_OWNER = 'owner/UPDATE_SELECTED_OWNER';

const fetchOwners = lastName => ({
  type: FETCH_OWNERS,
  lastName
});

const fetchOwner = id => ({
  type: FETCH_OWNER_BY_ID,
  id
});

const updateOwners = owners => ({
  type: UPDATE_OWNERS,
  owners
});

const updateSelectedOwner = owner => ({
  type: UPDATE_SELECTED_OWNER,
  owner
});

const ajaxError = payload => ({ type: AJAX_ERROR, payload });

const ownerReducer = (state = initialAppState.owner, action) => {
  switch (action.type) {
    case AJAX_ERROR: {
      // eslint-disable-next-line no-console
      console.log(action.payload);
      return { ...state };
    }
    case UPDATE_OWNERS: {
      const { owners } = action;
      return { ...state, results: owners };
    }
    case UPDATE_SELECTED_OWNER: {
      const { owner } = action;
      return { ...state, selectedOwner: owner };
    }
    default: {
      return { ...state };
    }
  }
};

const petClinicServiceUrl = 'http://localhost:8080/api';

const fetchOwnersEpic = action$ =>
  action$.pipe(
    ofType(FETCH_OWNERS),
    mergeMap(({ lastName }) =>
      ajax
        .getJSON(`${petClinicServiceUrl}/owner/list?lastName=${lastName}`)
        .pipe(
          map(owners => updateOwners(owners)),
          catchError(error => of(ajaxError(error.xhr.response)))
        )
    )
  );

const fetchOwnerByIdEpic = action$ =>
  action$.pipe(
    ofType(FETCH_OWNER_BY_ID),
    mergeMap(({ id }) =>
      ajax.getJSON(`${petClinicServiceUrl}/owner/${id}`).pipe(
        map(owner => updateSelectedOwner(owner)),
        catchError(error => of(ajaxError(error.xhr.response)))
      )
    )
  );

const ownerEpic = combineEpics(fetchOwnersEpic, fetchOwnerByIdEpic);

export { ownerReducer as default, ownerEpic, fetchOwner, fetchOwners };
