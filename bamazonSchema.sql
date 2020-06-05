DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT DECIMAL(10),
    stock INT
);

INSERT INTO products(product_name, department_name, price, stock)
VALUES("Optimum Nutrition 100% Whey Protein", "Health and Nutrition", 54.59, 10),
    ("MuscleTech", "Health and Nutrition", 9.59, 10),
    ("Inception", "Movies", 12.44, 5),
    ("Yamaha Montage 8 Synthesizer", "Music", 3999.99, 3),
    ("MVP Disc Golf Basket", "Sports", 169.95, 5),
    ("Discraft Jawbreaker Putter 173G", "Sports", 12.98, 5),
    ("Interstellar", "Movies", 14.49, 3),
    ("Batman Begins", "Movies", 11.95, 3),
    ("The Dark Knight", "Movies", 13.45, 3),
    ("The Dark Night Rises", "Movies", 13.99, 4);

SELECT * FROM products;
    