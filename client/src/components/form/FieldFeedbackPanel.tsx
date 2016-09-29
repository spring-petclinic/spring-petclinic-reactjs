import * as React from 'react';

import { IFieldError } from '../../types';

export default ({valid, fieldError}): {valid: boolean, fieldError: IFieldError} => {
    if (valid) {
      return <span className='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>;
    }

    if (fieldError) {
      return (<span>
        <span className='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>
        <span className='help-inline'>{fieldError.message}</span>
      </span>);
    }

    return null;
};