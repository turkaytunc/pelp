import { updateRestaurantById } from 'src/util';

beforeAll(() => jest.spyOn(window, 'fetch'));
afterEach(jest.clearAllMocks);

describe('updateRestaurantById', () => {
  it('should work', () => {
    (window.fetch as jest.Mock).mockResolvedValue({ status: 204 });

    return updateRestaurantById('5', 'url', 'ali', 'edirne', 5).then((res) => expect(res.status).toBe(204));
  });

  it('should work without url', () => {
    (window.fetch as jest.Mock).mockResolvedValue({ status: 204 });

    return updateRestaurantById('5', undefined, 'ali', 'edirne', 5).then((res) => expect(res.status).toBe(204));
  });
});
