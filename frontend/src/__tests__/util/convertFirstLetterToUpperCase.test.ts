import { convertFirstLetterToUpperCase } from 'src/util';

describe('convertFirstLetterToUpperCase', () => {
  describe('input length less than 2', () => {
    it('should convert succesfully', () => {
      expect(convertFirstLetterToUpperCase('')).toBe('');
    });

    it('should convert h to H', () => {
      expect(convertFirstLetterToUpperCase('h')).toBe('H');
    });

    it('should convert H to H', () => {
      expect(convertFirstLetterToUpperCase('H')).toBe('H');
    });
  });

  describe('input length more than 2', () => {
    it('should convert hfhd to Hfhd', () => {
      expect(convertFirstLetterToUpperCase('hfhd')).toBe('Hfhd');
    });
  });

  describe('input length more than 2 and start and end with space', () => {
    it('should convert hfhd to Hfhd - start with space', () => {
      expect(convertFirstLetterToUpperCase(' hfhd')).toBe('Hfhd');
    });

    it('should convert hfhd to Hfhd - end with space', () => {
      expect(convertFirstLetterToUpperCase(' hfhd ')).toBe('Hfhd');
    });
  });
});
