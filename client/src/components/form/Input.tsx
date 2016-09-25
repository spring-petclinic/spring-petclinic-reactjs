import * as React from 'react';

import { IError, IOnChangeHandler } from '../../types';

export default ({object, error, name, label, onChange}: { object: any, error: IError, name: string, label: string, onChange: IOnChangeHandler }) => {

  const handleOnChange = event => {
    onChange(event.target.name, event.target.value);
  };

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
        <input type='text' name={name} className='form-control' value={object[name]} onChange={handleOnChange} />
        <span className='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>
        {renderErrorLabel()}
      </div>
    </div>
  );
};