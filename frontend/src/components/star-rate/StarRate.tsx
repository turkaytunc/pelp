import React from 'react';
import './star-rate.scss';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRate = ({ rating, color }: { rating: number; color?: string }): React.ReactElement => {
  const stars = [];

  for (let i = 1; i <= 5; i += 1) {
    if (i <= rating) {
      stars.push(<FaStar fill={color} key={`${i}`} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt fill={color} key={i + 5} />);
    } else {
      stars.push(<FaRegStar key={`${i}`} />);
    }
  }

  return <>{stars}</>;
};

export default StarRate;

StarRate.defaultProps = { color: 'yellow' };
