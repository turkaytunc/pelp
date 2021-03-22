import React, { useEffect, useState } from 'react';
import './restaurant-details.scss';
import { AddReview, ReviewCard, StarRate } from 'src/components';
import { getReviewsByRestaurantId } from 'src/util';
import { useParams } from 'react-router-dom';
import { Review } from 'src/interfaces';

const RestaurantDetails = (): React.ReactElement => {
  const { id }: { id: string } = useParams();
  const [restaurant, setRestaurant] = useState<Review[]>([]);
  const [fetchError, setFetchError] = useState('');
  const [averageRating, setAverageRating] = useState('');

  const fetchRestaurantReview = async () => {
    try {
      const response = await getReviewsByRestaurantId(id);
      const data = await response.json();
      if (response.status === 200) {
        setRestaurant(data.reviews);
        setAverageRating(data.average);
      } else {
        setFetchError(data.message);
      }
    } catch (error) {
      setFetchError(error.message);
    }
  };

  useEffect(() => {
    fetchRestaurantReview();
  }, [useParams]);

  return (
    <div className="restaurant-details-container">
      <header className="restaurant-details-header">Restaurant Details</header>
      {averageRating ? <StarRate rating={parseInt(averageRating, 10)} /> : <StarRate rating={0} />}
      <div className="restaurant-details-card-grid">
        {restaurant.map((item) => (
          <ReviewCard key={item.id} rating={item.rating} name={item.user} comment={item.comment} />
        ))}
      </div>
      {fetchError}
      <AddReview />
    </div>
  );
};

export default RestaurantDetails;
