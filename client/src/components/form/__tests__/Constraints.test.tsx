require('jest');

import * as Constraints from '../Constraints';

const afunc = ({a}) => {};

describe('Constraints', () => {
  describe('NotEmpty', () => {
    it('should return false for an empty string', () => {
      expect(Constraints.NotEmpty.validate('')).toBe(false);
    });
    it('should return false for null', () => {
      expect(Constraints.NotEmpty.validate(null)).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(Constraints.NotEmpty.validate(undefined)).toBe(false);
    });
    it('should return true for a string', () => {
      expect(Constraints.NotEmpty.validate('Hello World')).toBe(true);
    });
  });

  describe('Digits', () => {
    it('should return true for a valid length', () => {
      expect(Constraints.Digits(3).validate('123')).toBe(true);
      expect(Constraints.Digits(3).validate('1')).toBe(true);
    });
    it('should return false for a string containing non-digits', () => {
      expect(Constraints.Digits(3).validate('1x3')).toBe(false);
    });
    it('should return false for a number that is too long', () => {
      expect(Constraints.Digits(3).validate('1234')).toBe(false);
    });
  });
});
