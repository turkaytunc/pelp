import { isInputEmpty } from 'src/util';

describe('isInputEmpty', () => {
  it('should return false', () => {
    expect(isInputEmpty('  ')).toBeFalsy();
  });

  it('should return true', () => {
    expect(isInputEmpty('')).toBeTruthy();
  });

  it('should return true', () => {
    expect(isInputEmpty('', '', ' ')).toBeTruthy();
  });

  it('should return true', () => {
    expect(isInputEmpty('hello', '', '', ' ')).toBeTruthy();
  });
});
