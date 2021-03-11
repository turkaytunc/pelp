import React from 'react';
import './list-card.scss';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { Restaurant } from 'src/interfaces';

const ListCard = ({ restaurant }: { restaurant: Restaurant }): React.ReactElement => {
  const { id, name, location, priceRange } = restaurant;
  return (
    <div className="listcard-container">
      <img
        src="https://camo.githubusercontent.com/d9b5643af3d25bd3d6842a691030fc4898d6a80a83ae6c6ef6d5e4f6de6ea8fb/68747470733a2f2f69636f6e67722e616d2f64657669636f6e2f6a6176617363726970742d6f726967696e616c2e7376673f73697a653d363026636f6c6f723d63757272656e74436f6c6f72"
        alt="restaurant placeholder"
      />
      <div className="listcard-details">
        <div className="details-item">{name}</div>
        <div className="details-item">{location}</div>
        <div className="details-item">{priceRange}</div>
        <div className="details-item">Ratings</div>
      </div>
      <div className="listcard-button-container">
        <button type="button" className="card-button edit-button">
          <FaEdit fill="#e0b90c" /> Edit
        </button>
        <button type="button" className="card-button delete-button">
          <FaTrash fill="#e00c0c" /> Delete
        </button>
      </div>
    </div>
  );
};

export default ListCard;
