CREATE TABLE IF NOT EXISTS restaurants (
id SERIAL PRIMARY KEY,
name VARCHAR(70),
location VARCHAR(70),
price_range integer
);


INSERT INTO restaurants(name,location,price_range) values ('pasa', 'edirne', 4);