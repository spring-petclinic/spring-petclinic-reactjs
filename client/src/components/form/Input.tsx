import * as React from 'react';

import { IConstraint, IError, IInputChangeHandler } from '../../types';

const NoConstraint: IConstraint = {
  message: '',
  validate: v => true
};

export default ({object, error, name, constraint = NoConstraint, label, onChange}: { object: any, error: IError, name: string, constraint?: IConstraint, label: string, onChange: IInputChangeHandler }) => {

  const handleOnChange = event => {
    const { name, value } = event.target;

    // run validation (if any)
    let error = null;
    const fieldError = constraint.validate(value) === false ? { field: name, message: constraint.message } : null;

    // invoke callback
    onChange(name, value, fieldError);
  };

  const value = object[name];
  const fieldError = error && error.fieldErrors[name];

  const valid = !fieldError && value;

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
        <input type='text' name={name} className='form-control' value={value} onChange={handleOnChange} />

        {renderFeedback()}
      </div>
    </div>
  );
};