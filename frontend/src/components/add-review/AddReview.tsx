import React from 'react';
import './add-reviews.scss';

const AddReview = (): React.ReactElement => {
  return (
    <form>
      <label htmlFor="review-name-input">
        <input type="text" id="review-name-input" placeholder="Name" />
      </label>
      <label htmlFor="review-comment-input">
        <textarea id="review-comment-input" />
      </label>
      <label htmlFor="review-rating">
        <select name="review-rating" id="review-rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
    </form>
  );
};

export default AddReview;
