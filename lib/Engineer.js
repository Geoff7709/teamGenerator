// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

class Engineer extends Employee {
    constructor(name, id, email, github,) {
        super(name, id, email)
        this.github = github;
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = 'Engineer'
    }
    getGithub() {
        return this.github
    }
}
const engineer = new Engineer('Alice',110, 'alice@gmail.com', 'GitHubUser')
console.log(engineer)
module.exports = Engineer