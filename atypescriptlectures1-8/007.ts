// const names = ['Max', 'Manuel']
const names0: string[] = []
const names: Array<string> = []

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done')
    // resolve(10)
  }, 2000)
})

promise.then((data) => {
  data.split(' ')
})

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 })
console.log(mergedObj.age)

interface Lengthy {
  length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.'
  if (element.length === 1) {
    descriptionText = 'Got 1 element.'
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.'
  }
  return [element, descriptionText]
}

console.log(countAndDescribe('Hi there!'))

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]
}

console.log(extractAndConvert({ name: 'Max' }, 'name'))

class DataStorage<T> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Solar')
textStorage.addItem('Lunar')
textStorage.removeItem('Solar')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number | string>()
numberStorage.addItem('hey')

const objStorage = new DataStorage<object>()
objStorage.addItem({ name: 'Max' })
objStorage.addItem({ name: 'Manu' })
objStorage.removeItem({ name: 'Max' })
console.log(objStorage.getItems())


interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

function createCourseGoal(title: string, description: string, date: Date) : CourseGoal {
  let CourseGoal: Partial<CourseGoal> = {}
  CourseGoal.title = title
  CourseGoal.description = description
  // CourseGoal.completeUntil = date
  return CourseGoal as CourseGoal
  // return {
  //   title: title,
  //   description: description,
  //   completeUntil: date
  // }
}

let dan = createCourseGoal('solar', 'windcity', new Date())
console.log(dan)

const names4: Readonly<string[]> = ['Max', 'Sports']
names.push('Manu')