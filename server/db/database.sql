CREATE DATABASE pern_stack_yelp;
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(70),
    location VARCHAR(70),
    price_range integer
);

INSERT INTO restaurants(name, location, price_range)
values ('pasa', 'edirne', 4);
ALTER TABLE restaurants
ADD CONSTRAINT price_range check(
        price_range >= 1
        and price_range <= 5
    );

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    body VARCHAR(250) NOT NULL,
    rating INTEGER NOT NULL CHECK(
        rating >= 1
        and rating <= 5
    ),
    fk_restaurants INTEGER NOT NULL References restaurants(id)
);

INSERT INTO reviews(name, body, rating, fk_restaurants)
VALUES(
        'Usta Şef',
        'Yemek soguk geldi sacma salak bir yer.j',
        3,
        20
    );

ALTER TABLE reviews drop constraint reviews_fk_restaurants_fkey,
    add constraint fk_rest FOREIGN KEY (fk_restaurants) REFERENCES restaurants(id) ON DELETE CASCADE;

SELECT body AS comment,
    reviews.name AS user,
    restaurants.name AS restaurant_name
FROM restaurants,
    reviews
WHERE restaurants.id = reviews.fk_restaurants;


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_unique uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(70) NOT NULL,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(50) NOT NULL
);