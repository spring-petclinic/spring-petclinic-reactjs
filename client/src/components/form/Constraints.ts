import { IConstraint } from '../../types';

export const NotEmpty: IConstraint = {
  message:    'Enter at least one character',
  validate: (value) => {
    return !!value && value.length > 0;
  }
};

export const Digits = (digits: number): IConstraint => {
  const reg = new RegExp('^\\d{1,' + digits + '}$');
  return {
    message: 'Must be a number with at most ' + digits + ' digits',
    validate: (value) => {
      return !!value && value.match(reg) !== null;
    }
  };
};
