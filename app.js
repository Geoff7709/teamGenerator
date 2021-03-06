const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const validator = require("email-validator");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = []
const questions = [
    {
        name: "role",
        type: "list",
        message: "What is the team member's role?",
        choices: ["Manager", "Engineer", "Intern"],
        default: "Emloyee"
    },
    {
        name: "name",
        message: "What is the team member's name?",
    },
    {
        name: "id",
        message: "What is their employee id?",
    },
    {
        name: "email",
        type: "input",
        message: "What is their employee email address?",
        validate: (email) => {
            valid = validator.validate(email)
            if (valid) {
                return true
            }else {
                console.log(`\n Please enter a valid email.`)
                return false
            }
        }
    },
    {
        name: "officeNumber",
        message: "What is the manager's office number?",
        when: (answers) => answers.role === "Manager"
    },
    {
        name: "github",
        message: "What is the engineer's GitHub user name?",
        when: (answers) => answers.role === "Engineer"
    },
    {
        name: "school",
        message: "Where is the intern attending classes?",
        when: (answers) => answers.role === "Intern"
    },
    {
        name: "anotherMember",
        message: "Would you like to add another team member?",
        type: "confirm"
    }
    
]
const gatherTeam = () => {
    inquirer.prompt(questions)
    .then((answers) => {
        // console.log(validator.validate(answers.email))
        if (answers.role === "Manager") {
            let employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            employees.push(employee)
        }if (answers.role === "Engineer") {
            let employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
            employees.push(employee)
        }if (answers.role === "Intern") {
            let employee = new Intern(answers.name, answers.id, answers.email, answers.school);
            employees.push(employee)
        }if (answers.anotherMember === true){
            gatherTeam()
        }else {
            fs.writeFile( outputPath, render(employees), function (err) {
                if (err) throw err;
                console.log('Saved!');
              })
        }
    })
}
gatherTeam()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
