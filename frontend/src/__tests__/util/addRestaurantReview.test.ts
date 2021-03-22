import { addRestaurantReview } from 'src/util/addRestaurantReview';

jest.spyOn(window, 'fetch');

describe('addRestaurantReview', () => {
  it('should fetch data without error', async () => {
    (window.fetch as jest.Mock).mockResolvedValue({ status: 200 });
    const response = await addRestaurantReview('3', 'user', '5', 'This is a comment');

    expect(response.status).toBe(200);
  });
});
