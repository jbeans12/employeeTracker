const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employeeT_db',
});

const start = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ['View All Employees', 'View All Employees By Department', 'Add Employee', 'Update Employee Role'],
            
        }
    ])
    .then(userChoice => {
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
                type: 'rawlist',
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
    })
    
};

const showEmployeesByDep = () => {

};

const addEmployee = () => {
    inquirer
    .prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the new employees first name?',
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the employees last name?',
        },
        { 
            name: 'role',
            type: 'input',
            message: 'What is the new employees role?',
            validate(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                    return false;
            },
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

const updateRole = () => {

};


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start(); 
  });
