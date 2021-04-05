import React from 'react';
import { StarRate } from 'src/components';
import './review-card.scss';

const ReviewCard = ({
  name,
  rating,
  comment,
}: {
  name: string;
  rating: string;
  comment: string;
}): React.ReactElement => {
  return (
    <div className="review-card-container">
      <div className="review-card-user">
        <div>{name}</div>
        <StarRate color="#dc2850" rating={parseInt(rating, 10)} />
        <div>{new Date().toLocaleDateString('tr-TR')}</div>
      </div>
      <div className="review-card-comment">{comment}</div>
    </div>
  );
};

export default ReviewCard;
