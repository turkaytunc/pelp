CREATE DATABASE pern_stack_yelp;

CREATE TABLE IF NOT EXISTS restaurants (
id SERIAL PRIMARY KEY,
name VARCHAR(70),
location VARCHAR(70),
price_range integer
);


INSERT INTO restaurants(name,location,price_range) values ('pasa', 'edirne', 4);
ALTER TABLE restaurants ADD CONSTRAINT price_range check(price_range >= 1 and price_range <=5);