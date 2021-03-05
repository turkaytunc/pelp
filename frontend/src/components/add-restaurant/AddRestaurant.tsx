import React from 'react';

const AddRestaurant = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <label htmlFor="restaurant-name">
          <input type="text" name="restaurant-name" id="restaurant-name" value={} />
        </label>
      </form>
    </div>
  );
};

export default AddRestaurant;
