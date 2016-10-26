require('jest');

import { url, submitForm } from '../../src/util';

import * as React from 'react';

fetch = require('./fetch-mock');
const fetchMock: any = fetch;

describe('util', () => {
  describe('url', () => {
    it('returns url with full path', () => {
      expect(url('xxx')).toBe('http://localhost:8080/xxx');
    });
  });

  describe('submitForm', () => {
    beforeEach(() => fetchMock.mockClear());

    it('submits all data', () => {
      fetchMock.mockResponse(JSON.stringify({ 'x': 'y' }), { status: 200 });
      return submitForm('POST', '/some-enzyme', { name: 'Test' }, (status, response) => {
        // make sure request data is passed to fetch as expected 
        expect(fetchMock.mock.calls.length).toBe(1);
        expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8080//some-enzyme');
        expect(fetchMock.mock.calls[0][1].method).toBe('POST');
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({ name: 'Test' }));

        // make sure response from fetch ist corrently passed to the onSuccess callback
        expect(status).toBe(200);
        expect(response).toEqual({ 'x': 'y' });
      });
    });

    it('works with No Content (204) responses', () => {
      fetchMock.mockResponse('', { status: 204 });
      return submitForm('PUT', '/somewhere', { name: 'Test' }, (status, response) => {
        expect(fetchMock.mock.calls.length).toBe(1);
        expect(status).toBe(204);
        expect(response).toEqual({});
      });
    });
  });
});
