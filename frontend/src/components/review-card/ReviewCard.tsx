import React from 'react';
import { StarRate } from 'src/components';
import './review-card.scss';

const ReviewCard = ({ rating }: { rating: number }): React.ReactElement => {
  return (
    <div className="review-card-container">
      <div className="review-card-user">
        <div>user Name</div>
        <StarRate rating={rating} />
        <div>{new Date().toLocaleDateString('tr-TR')}</div>
      </div>
      <div className="review-card-comment">Comment</div>
    </div>
  );
};

export default ReviewCard;
