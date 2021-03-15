import React, { useContext, useState } from 'react';
import './list-card.scss';
import { useHistory } from 'react-router-dom';

import { Restaurant } from 'src/interfaces';
import { ActionType, API_URL } from 'src/constants';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { Store } from 'src/context/Store';
import { deleteRestaurantById } from 'src/util';

const ListCard = ({ restaurant }: { restaurant: Restaurant }): React.ReactElement => {
  const { id, name, location, priceRange } = restaurant;
  const history = useHistory();

  const { state, dispatch } = useContext(Store);
  const [deleteError, setDeleteError] = useState('');

  const handleDelete = async (restaurantId: number) => {
    try {
      const response = await deleteRestaurantById(API_URL, window.fetch, restaurantId);
      if (response.status === 204) {
        dispatch({ type: ActionType.REMOVE_RESTAURANT, payload: restaurantId });
      }
    } catch (error) {
      setDeleteError(error.message);
    }
  };
  const handleUpdate = (restaurantId: number) => {
    history.push(`/restaurant/${restaurantId}/update`);
  };
  const handleDetails = (restaurantId: number) => {
    history.push(`/restaurant/${restaurantId}`);
  };

  return (
    <div className="listcard-container">
      <div
        data-testid="listcard-details"
        className="listcard-image-container"
        role="button"
        onClick={() => handleDetails(id)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter') return handleDetails(id);
          return null;
        }}
      >
        <img
          src="https://camo.githubusercontent.com/d9b5643af3d25bd3d6842a691030fc4898d6a80a83ae6c6ef6d5e4f6de6ea8fb/68747470733a2f2f69636f6e67722e616d2f64657669636f6e2f6a6176617363726970742d6f726967696e616c2e7376673f73697a653d363026636f6c6f723d63757272656e74436f6c6f72"
          alt="restaurant placeholder"
        />
      </div>

      <div className="listcard-details">
        <div className="details-item"> {name}</div>
        <div className="details-item"> {location}</div>
        <div className="details-item"> {'$'.repeat(priceRange)}</div>
        <div className="details-item">Ratings</div>
      </div>
      <div className="listcard-button-container">
        <button
          data-testid="listcard-edit"
          onClick={() => handleUpdate(id)}
          type="button"
          className="card-button edit-button"
        >
          <FaEdit fill="#e0b90c" /> Edit
        </button>
        <button
          data-testid="listcard-delete"
          onClick={() => handleDelete(id)}
          type="button"
          className="card-button delete-button"
        >
          <FaTrash fill="#e00c0c" /> Delete
        </button>
      </div>
      <div>{deleteError}</div>
    </div>
  );
};

export default ListCard;
