import React, { useContext, useState } from 'react';
import './list-card.scss';
import { useHistory } from 'react-router-dom';

import { Restaurant } from 'src/interfaces';
import { ActionType, API_URL } from 'src/constants';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { Store } from 'src/context/Store';
import { deleteRestaurantById } from 'src/util';
import restJPG from 'src/images/rest.jpg';

const ListCard = ({ restaurant }: { restaurant: Restaurant }): React.ReactElement => {
  const { id, name, location, priceRange, reviews } = restaurant;
  const history = useHistory();

  const { state, dispatch } = useContext(Store);
  const [deleteError, setDeleteError] = useState('');

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, restaurantId: number) => {
    event.stopPropagation();

    try {
      const response = await deleteRestaurantById(API_URL, window.fetch, restaurantId);
      if (response.status === 204) {
        dispatch({ type: ActionType.REMOVE_RESTAURANT, payload: restaurantId });
      } else return;
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, restaurantId: number) => {
    event.stopPropagation();
    history.push(`/restaurant/${restaurantId}/update`);
  };

  const handleDetails = (restaurantId: number) => {
    history.push(`/restaurant/${restaurantId}`);
  };

  return (
    <div
      className="listcard-container"
      style={{
        backgroundImage: `linear-gradient(270deg,rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${restJPG})`,
      }}
      data-testid="listcard-details"
      role="button"
      onClick={() => handleDetails(id)}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') return handleDetails(id);
        return null;
      }}
    >
      <div className="listcard-details">
        <div className="details-item"> {name}</div>
        <div className="details-item"> {location}</div>
        <div className="details-item"> {'$'.repeat(priceRange)}</div>
        <div className="details-item">reviews</div>
      </div>
      <div className="listcard-button-container">
        <button
          data-testid="listcard-edit"
          onClick={(event) => handleUpdate(event, id)}
          type="button"
          className="card-button edit-button"
        >
          <FaEdit fill="#e0b90c" /> Edit
        </button>
        <button
          data-testid="listcard-delete"
          onClick={(event) => handleDelete(event, id)}
          type="button"
          className="card-button delete-button"
        >
          <FaTrash fill="#e00c0c" /> Delete
        </button>
        <div>{deleteError}</div>
      </div>
    </div>
  );
};

export default ListCard;
