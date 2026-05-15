CREATE DATABASE IF NOT EXISTS orphanage_db;
USE orphanage_db;

CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    password VARCHAR(100)
);

INSERT INTO admins(username, password)
VALUES('admin', 'admin123');

CREATE TABLE children (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    age INT,
    gender VARCHAR(20),
    admission_date DATE,
    health_status VARCHAR(255)
);

CREATE TABLE donations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    donor_name VARCHAR(100),
    amount DECIMAL(10,2),
    donation_date DATE
);

CREATE TABLE staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    position VARCHAR(100),
    salary DECIMAL(10,2)
);

CREATE TABLE expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    expense_name VARCHAR(100),
    amount DECIMAL(10,2),
    expense_date DATE
);