import { IHttpMethod } from '../types';
import * as Cookies from 'es-cookie';

declare var __API_SERVER_URL__;
const BACKEND_URL = (typeof __API_SERVER_URL__ === 'undefined' ? 'http://localhost:8080' : __API_SERVER_URL__);

export const url = (path: string): string => `${BACKEND_URL}/${path}`;

/**
 * path: relative PATH without host and port (i.e. '/api/123')
 * data: object that will be passed as request body
 * onSuccess: callback handler if request succeeded. Succeeded means it could technically be handled (i.e. valid json is returned)
 * regardless of the HTTP status code.
 */
export const submitForm = (method: IHttpMethod, path: string, data: any, onSuccess: (status: number, response: any) => void) => {
  const requestUrl = url(path);
  const token = Cookies.get('user');

  const fetchParams = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(data)
  };

  console.log('Submitting to ' + method + ' ' + requestUrl);
  return fetch(requestUrl, fetchParams)
    .then(response => response.status === 204 ? onSuccess(response.status, {}) : response.json().then(result => onSuccess(response.status, result)));
};
