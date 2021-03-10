import React from 'react';

const ListCard = (): React.ReactElement => (
  <div className="listcard-container">
    <img src="" alt="" />
    <div className="listcard-details">
      <div className="details-item">Name</div>
      <div className="details-item">Location</div>
      <div className="details-item">Price Range</div>
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

export default ListCard;
