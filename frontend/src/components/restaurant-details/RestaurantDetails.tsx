import React, { useEffect, useState } from 'react';
import './restaurant-details.scss';
import { AddReview, ReviewCard, StarRate, DisplayError } from 'src/components';
import { getReviewsByRestaurantId } from 'src/util';
import { useParams } from 'react-router-dom';
import { Review } from 'src/interfaces';

const RestaurantDetails = (): React.ReactElement => {
  const { id }: { id: string } = useParams();
  const [restaurant, setRestaurant] = useState<Review[]>([]);
  const [responseError, setResponseError] = useState('');
  const [averageRating, setAverageRating] = useState('');
  const [details, setDetails] = useState({ name: '', location: '' });

  const fetchRestaurantReview = async () => {
    try {
      const response = await getReviewsByRestaurantId(id);
      const data = await response.json();
      if (response.status === 200) {
        setRestaurant(data.reviews);
        setAverageRating(data.average);
        setDetails(data.details);
      } else {
        setResponseError(data.message);
      }
    } catch (error) {
      setResponseError(error.message);
    }
  };

  useEffect(() => {
    fetchRestaurantReview();
  }, [useParams]);

  return (
    <div className="restaurant-details-container">
      <header className="restaurant-details-header">
        {details?.name ? details.name : 'Restaurant Name'}
        <span style={{ fontSize: '0.75rem' }}>({details?.location ? details.location : 'Location'})</span>
      </header>
      {averageRating ? <StarRate rating={parseInt(averageRating, 10)} /> : <StarRate rating={0} />}
      <div className="restaurant-details-card-grid">
        {restaurant.map((item) => (
          <ReviewCard key={item.id} rating={item.rating} name={item.user} comment={item.comment} />
        ))}
      </div>
      {responseError && <DisplayError message={responseError} />}
      <AddReview />
    </div>
  );
};

export default RestaurantDetails;
