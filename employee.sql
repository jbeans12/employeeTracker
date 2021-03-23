DROP DATABASE IF EXISTS employeeT_db;
CREATE DATABASE employeeT_db;
USE employeeT_db;

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFRENCES departments(id)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    departmentName VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);



-- SELECT * FROM employee;
-- SELECT * FROM roles;
-- SELECT * FROM department;