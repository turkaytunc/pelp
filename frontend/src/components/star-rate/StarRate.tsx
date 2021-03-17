import React from 'react';
import './star-rate.scss';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';

const StarRate = ({ rating }: { rating: number }): React.ReactElement => {
  const stars = [];

  for (let i = 0; i < 5; i += 1) {
    if (i <= rating) {
      stars.push(<FaStar />);
    } else {
      stars.push(<FaRegStar />);
    }
  }

  return <div>{stars}</div>;
};

export default StarRate;
