drop database if exists Bamazon;

create database Bamazon;

use Bamazon;

create table products(
	item_id integer not null auto_increment,
    product_name varchar(100) not null,
    department_name varchar(100),
    price decimal(11) not null,
    stock_quantitity integer(11) not null ,
    primary key(item_id)
    );
    
	insert into products(product_name,department_name,price,stock_quantitity) values ("soda","groceries",2.99,300);
    
	insert into products(product_name,department_name,price,stock_quantitity) values ("spiderman","toys",15.99,100);
    
    insert into products(product_name,department_name,price,stock_quantitity) values ("phone","utilities",800.99,35);
    insert into products(product_name,department_name,price,stock_quantitity) values ("plunger","utilities",10.99,500);
    
    insert into products(product_name,department_name,price,stock_quantitity) values ("make-up","Beauty Products",55.99,20);