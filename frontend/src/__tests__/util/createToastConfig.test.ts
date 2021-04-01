import { createToastConfig } from 'src/util';

describe('createToastConfig', () => {
  it('should return ', () => {
    const fake = jest.fn(() => null);
    createToastConfig(fake);

    expect(fake).not.toBeCalled();
  });
});
