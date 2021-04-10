import React, { useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { addRestaurantReview, joiValidators } from 'src/util';
import { DisplayError } from 'src/components';
import './add-reviews.scss';

const { reviewValidation } = joiValidators;

const AddReview = (): React.ReactElement => {
  const { id }: { id: string } = useParams();
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState('5');
  const [fetchError, setFetchError] = useState('');
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await reviewValidation.validateAsync({ username, userRating, comment });
      const response = await addRestaurantReview(id, username, userRating, comment);

      if (response.status === 201) {
        history.push(`/`);
        return;
      }

      const data = await response.json();
      setFetchError(data.message);
    } catch (error) {
      setFetchError(error.message);
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="add-review-form" data-testid="review-form">
      <h2 className="add-review-header">Add Your Review</h2>
      <section className="input-section">
        <label htmlFor="review-username-input">
          <input
            data-testid="review-username-input"
            className="add-review-username"
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            id="review-username-input"
            placeholder="Your Name"
            value={username}
          />
        </label>
        <label className="add-review-label" htmlFor="review-rating">
          <p>Rating</p>
          <select
            data-testid="review-rating-input"
            onBlur={(event) => setUserRating(event.target.value)}
            onChange={(event) => setUserRating(event.target.value)}
            className="add-review-rating"
            name="review-rating"
            id="review-rating"
            value={userRating}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label htmlFor="review-comment-input">
          <textarea
            data-testid="review-comment-input"
            onChange={(event) => setComment(event.target.value)}
            className="add-review-textarea"
            id="review-comment-input"
            placeholder="Comment Here"
            maxLength={100}
            cols={20}
            rows={10}
            value={comment}
          />
        </label>
      </section>
      <button data-testid="add-review-button" className="add-review-button" type="submit">
        Add Review
      </button>
      {fetchError && <DisplayError message={fetchError} />}
    </form>
  );
};

export default AddReview;
