DROP DATABASE IF EXISTS bamazon_DB;

CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(30) NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Lamp", "Furniture", 250, 10),
("Velvet Couch - Love Seat", "Furniture", 850, 2),
("Velvet Couch - Sofa", "Furniture", 1500, 2),
("Dining Room Table", "Furniture", 2500, 6),
("Chairs", "Furniture", 250, 60),
("Entertainment Center", "Furniture", 1000, 10),
("Soccer Shoes", "Sporting Goods", 21.99, 30),
("Jerseys", "Sporting Goods", 55, 50),
("Socks", "Sporting Goods", 10.99, 100),
("Soccer Shorts", "Sporting Goods", 15.99, 60),
("Body Lotion", "Beauty & Health", 30, 60),
("Facial Cleanser", "Beauty & Health", 5.99, 54),
("Moisturier", "Beauty & Health", 80, 150),
("iPhone Charger", "Electronics", 60, 100),
("Chrome Tablets", "Electronics", 250, 80),
("HP Laptop", "Electronics", 550, 60);

SELECT * FROM products;