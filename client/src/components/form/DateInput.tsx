/// <reference path="../../react-datepicker.d.ts" />

import * as React from 'react';
const ReactDatePicker = require('react-datepicker');

import * as moment from 'moment';

import { IError, IInputChangeHandler } from '../../types';

export default ({object, error, name, label, onChange}: { object: any, error: IError, name: string, label: string, onChange: IInputChangeHandler }) => {

  const handleOnChange = value => {
    const dateString = value ? value.format('YYYY/MM/DD') : null;
    onChange(name, dateString, null);
  };

  const selectedValue = object[name] ? moment(object[name], 'YYYY/MM/DD') : null;
  const fieldError = error && error.fieldErrors[name];

  const renderErrorLabel = () => (
      fieldError ? (<span>
        <span className='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>
        <span className='help-inline'>{error.fieldErrors[name].message}</span>
      </span>)
      :
      null
  );

  const cssGroup = `form-group ${fieldError ? 'has-error' : ''}`;

  return (
    <div className={cssGroup}>
      <label className='col-sm-2 control-label'>{label}</label>

      <div className='col-sm-10'>
        <ReactDatePicker selected={selectedValue} onChange={handleOnChange} className='form-control' dateFormat='YYYY-MM-DD' />
        <span className='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>
        {renderErrorLabel()}
      </div>
    </div>
  );
};
