class Department {
  // private id: string
  // private name: string
  protected employees: string[] = []

  // constructor(id: string, n: string) {
  //   this.id = id
  //   this.name = n
  // }
  constructor(private readonly id: string, public name: string) {
    
  }

  static createEmployee(name: string) {
    return {name: name}
  }

  

  describe(this: Department) {
    console.log(`This is my Department (${this.id}): ${this.name}`)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log('Employee Array Length: ' + this.employees.length)
    console.log('Employee List: ' + this.employees)
  }

}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'NEW NAME')
  }
}

class AccountingDepartment extends Department {
  private lastReport: string

  set mostRecentReport(value: string) {
    this.addEmployee(value)
  }

  get mostRecentReport() {
    if(this.lastReport) {
      return this.lastReport
    }
    throw new Error('No Report Found!')
  }

  MyMostRecentReport() {
    if(this.lastReport) {
      return this.lastReport
    }
    throw new Error('No Report Found!')
  }


  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }

  addEmployee(name: string) {
    if(name === 'Max') {
      return
    }
    this.employees.push(name)
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  printReports() {
    console.log(this.reports)
  }
}

const employee1 = Department.createEmployee('Max')
console.log(employee1)

const it = new ITDepartment('d1', ['IT'])
it.addEmployee('Max')
it.addEmployee('Manu')
it.describe()
it.printEmployeeInformation()
console.log(it)

const accountingDep = new AccountingDepartment('D2', [])
accountingDep.addReport('my initial report')
console.log(accountingDep.mostRecentReport)

accountingDep.addReport('Something went wrong')
accountingDep.printReports()

accountingDep.addEmployee('Max')
accountingDep.addEmployee('Manulife')
accountingDep.printEmployeeInformation()

// const accountingCopy = { 
//   // solara: accounting.describe.bind(accounting)
//   name: 'Dummy',
//   describe: accounting.describe,
//   employees: []
// }
// accountingCopy.describe()

