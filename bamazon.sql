DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;


CREATE TABLE products (
item_id INT AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price INT(20) NOT NULL,
stock_quantity INT(20) NOT NULL,
PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro","Computers and Technology",3500,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hot Wheels Track","Toys",120,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Wii U","Toys",699,21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cooking Pot","Household",99,72);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mens T-Shirt King Boo","Clothing and Apparel",25,7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose SoundColor Speaker","Computers and Technology",499,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pure acetone, 1L","Industrial and Scientific",14,3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Microfiber cloth","Automotive",2,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pure Ethanol, 2L","Industrial and Scientific",3500,1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Queen Album","Music and Multimedia",20,200);


SELECT * FROM products;
