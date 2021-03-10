import React from 'react';
import { Restaurant } from '../../../type-helpers';

const ListCard = ({ restaurant }: { restaurant: Restaurant }): React.ReactElement => {
  const { id, name, location, priceRange } = restaurant;
  return (
    <div key={id} className="listcard-container">
      <img src="" alt="" />
      <div className="listcard-details">
        <div className="details-item">{name}</div>
        <div className="details-item">{location}</div>
        <div className="details-item">{priceRange}</div>
        <div className="details-item">Ratings</div>
        <button type="button" className="edit-button">
          Edit
        </button>
        <button type="button" className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListCard;
