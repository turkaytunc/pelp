import { deleteRestaurantById } from 'src/util';

beforeAll(() => jest.spyOn(window, 'fetch'));
afterEach(jest.clearAllMocks);

describe('deleteRestaurantById', () => {
  it('should delete item by id', () => {
    (window.fetch as jest.Mock).mockResolvedValue({ status: 204, json: jest.fn });
    return deleteRestaurantById('url', window.fetch, 3).then((res) => expect(res.status).toBe(204));
  });

  it('should not find item and return 400', () => {
    (window.fetch as jest.Mock).mockResolvedValue({
      status: 400,
      json: jest.fn(() => Promise.resolve({ message: 'An Error Occured' })),
    });
    return deleteRestaurantById(undefined, window.fetch, 5).then((res) => expect(res.status).toBe(400));
  });

  it('should reject', () => {
    (window.fetch as jest.Mock).mockRejectedValue(new Error('An Error'));
    return deleteRestaurantById(undefined, window.fetch, 5).catch((res) => expect(res).toEqual(new Error('An Error')));
  });
});
