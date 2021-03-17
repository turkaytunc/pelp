import React from 'react';
import './star-rate.scss';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';

const StarRate = ({ rating }: { rating: number }): React.ReactElement => {
  const stars = [];

  for (let i = 1; i <= 5; i += 1) {
    if (i <= rating) {
      stars.push(<FaStar key={`${i}`} />);
    } else {
      stars.push(<FaRegStar key={`${i}`} />);
    }
  }

  return <div>{stars}</div>;
};

export default StarRate;
