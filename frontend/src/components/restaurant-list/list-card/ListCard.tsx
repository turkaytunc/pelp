import React, { useContext } from 'react';
import './list-card.scss';
import { useHistory } from 'react-router-dom';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { Restaurant } from 'src/interfaces';
import { Store } from 'src/context/Store';
import { ActionType, API_URL } from 'src/constants';
import { deleteRestaurantById } from 'src/util/deleteRestaurantById';

const ListCard = ({ restaurant }: { restaurant: Restaurant }): React.ReactElement => {
  const { id, name, location, priceRange } = restaurant;
  const history = useHistory();

  const { state, dispatch } = useContext(Store);

  const handleDelete = (restaurantId: number) => {
    deleteRestaurantById(API_URL, window.fetch, restaurantId)
      .then((res) => {
        if (res.status === 204) {
          dispatch({ type: ActionType.REMOVE_RESTAURANT, payload: restaurantId });
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  const handleUpdate = (restaurantId: number) => {
    history.push(`/restaurant/${restaurantId}/update`);
  };

  return (
    <div className="listcard-container">
      <img
        src="https://camo.githubusercontent.com/d9b5643af3d25bd3d6842a691030fc4898d6a80a83ae6c6ef6d5e4f6de6ea8fb/68747470733a2f2f69636f6e67722e616d2f64657669636f6e2f6a6176617363726970742d6f726967696e616c2e7376673f73697a653d363026636f6c6f723d63757272656e74436f6c6f72"
        alt="restaurant placeholder"
      />
      <div className="listcard-details">
        <div className="details-item"> {name}</div>
        <div className="details-item"> {location}</div>
        <div className="details-item"> {'$'.repeat(priceRange)}</div>
        <div className="details-item">Ratings</div>
      </div>
      <div className="listcard-button-container">
        <button onClick={() => handleUpdate(id)} type="button" className="card-button edit-button">
          <FaEdit fill="#e0b90c" /> Edit
        </button>
        <button onClick={() => handleDelete(id)} type="button" className="card-button delete-button">
          <FaTrash fill="#e00c0c" /> Delete
        </button>
      </div>
    </div>
  );
};

export default ListCard;
