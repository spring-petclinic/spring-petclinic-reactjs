import * as React from 'react';

import { IError, IInputChangeHandler, ISelectOption } from '../../types';

export default ({object, error, name, label, options, onChange}: { object: any, error: IError, name: string, label: string, options: ISelectOption[], onChange: IInputChangeHandler }) => {

  const handleOnChange = event => {
    console.log('select on change', event.target.value);
    onChange(name, event.target.value, null);
  };

  const selectedValue = object[name] || '';
  const fieldError = error && error.fieldErrors[name];
  const valid = !fieldError && selectedValue !== '';

 const renderFeedback = () => {

    if (valid) {
      return <span className='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>;
    }

    if (fieldError) {
      return (<span>
        <span className='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>
        <span className='help-inline'>{error.fieldErrors[name].message}</span>
      </span>);
    }

    return null;
  };


  const cssGroup = `form-group ${fieldError ? 'has-error' : ''}`;

  return (
    <div className={cssGroup}>
      <label className='col-sm-2 control-label'>{label}</label>

      <div className='col-sm-10'>
        <select size={5} className='form-control' name={name} onChange={handleOnChange} value={selectedValue}>
          {options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
        </select>
        {renderFeedback()}
      </div>
    </div>
  );
};