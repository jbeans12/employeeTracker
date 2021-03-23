DROP DATABASE IF EXISTS employeeT_db;

CREATE DATABASE employeeT_db;

USE employeeT_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT (100) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

CREATE TABLE rolee (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,10) NOT NULL,
    department_id INT(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
);

SELECT * FROM employee
SELECT * FROM rolee
SELECT * FROM department