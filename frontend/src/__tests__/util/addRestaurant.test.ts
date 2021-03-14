import { addRestaurant } from 'src/util';

beforeAll(() => jest.spyOn(window, 'fetch'));
afterEach(jest.clearAllMocks);

describe('addRestaurant', () => {
  it('should fetch without error ', () => {
    (window.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => Promise.resolve({ id: 3, name: 'Ali Usta', location: 'Edirne', price_range: 4 })),
    });

    return addRestaurant('Ali Usta', 'Edirne', 4, window.fetch)
      .then((res) => res.json())
      .then((res) => expect(res).toEqual({ id: 3, name: 'Ali Usta', location: 'Edirne', price_range: 4 }));
  });
});
