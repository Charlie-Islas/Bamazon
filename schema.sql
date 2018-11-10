DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;


CREATE TABLE products (
item_id INT AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price FLOAT(20) NOT NULL,
stock_quantity INT(20) NOT NULL,
PRIMARY KEY (item_id)
);


