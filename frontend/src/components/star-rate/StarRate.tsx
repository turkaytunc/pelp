import React from 'react';
import './star-rate.scss';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRate = ({ rating, color }: { rating: number; color?: string }): React.ReactElement => {
  const stars = [];

  for (let i = 1; i <= 5; i += 1) {
    if (i <= rating) {
      stars.push(<FaStar filter="drop-shadow(1px 5px 1px #000)" fill={color} key={`${i}`} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt filter="drop-shadow(1px 5px 1px #000)" fill={color} key={i + 5} />);
    } else {
      stars.push(<FaRegStar filter="drop-shadow(1px 5px 1px #000)" key={`${i}`} />);
    }
  }

  return <div>{stars}</div>;
};

export default StarRate;

StarRate.defaultProps = { color: 'yellow' };
