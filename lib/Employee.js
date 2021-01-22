// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email, role){
        this.name = name;
        this.id = id;
        this.email = email
        this.role = 'Employee'
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.role
    }
}

const employee = new Employee('Alice', 100, 'alice@gmail.com')
module.exports = Employee