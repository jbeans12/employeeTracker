const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employeeT_db',
});

const init = () => {
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
        }
    })
}
const showEmployees = () => {
    
};

const showEmployeesByDep = () => {

};

const addEmployee = () => {

};

const updateRole = () => {

};


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
  
    init();
    
  })
