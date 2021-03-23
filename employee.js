const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employeeT_DB',
});


const start = () => {
    inquirer
    .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ['View All Employees', 'View All Employees By Department', 'Add Employee', 'Update Employee Role', 'EXIT'],
        })
    .then((userChoice) => {
        if (userChoice.choice === 'View All Employees') {
            showEmployees();
        } else if (userChoice.choice === 'View All Employees By Department') {
            showEmployeesByDep();
        } else if (userChoice.choice === 'Add Employee') {
            addEmployee();
        } else if (userChoice.choice === 'Update Employee Role') {
            updateRole();
        } else {
            connection.end();
        }
    });
};

const showEmployees = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'choice',
                type: 'list',
                choices() {
                    const employeeArray = [];
                    results.forEach(({first_name, last_name}) => {
                        employeeArray.push(first_name, last_name);
                    });
                    return employeeArray;
                },
                message: 'Select an employee',
                
            },
        ])
    });
    
};

const showEmployeesByDep = () => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'choice',
                type: 'list',
                choices() {
                    const departmentArray = [];
                    results.forEach(({departmentName}) => {
                        departmentArray.push(departmentName);
                    });
                    return departmentArray;
                },
                message: 'Select a department',
                
            },
        ])
    });

};

const addEmployee = () => {
    inquirer
    .prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the new employees first name?',
            validate: value => {
                if (value) {
                    return true;
                } else {
                    console.log(`A name must be entered`)
                    return false;
                }
            }
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the employees last name?',
            validate: value => {
                if (value) {
                    return true;
                } else {
                    console.log(`A name must be entered`)
                    return false;
                }
            }
        },
        { 
            name: 'role',
            type: 'input',
            message: 'What is the new employees role?',
            validate: value => {
                if (value) {
                    return true;
                } else {
                    console.log(`A role must be entered`)
                    return false;
                }
            }
        },
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO employee SET ?',
            {
             first_name: answer.firstName,
             last_name: answer.lastName,
             role_id: answer.roleId,
            },
            (err) => {
                if (err) throw err;
                console.log('New Employee Added Sucessfully!');
                start();
            }
          );
        });
};

// const updateRole = () => {

// };


connection.connect((err) => {
    if (err) throw err;
    start(); 
  });
