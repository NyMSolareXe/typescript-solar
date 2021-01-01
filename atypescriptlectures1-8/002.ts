// const person: {
//   name: string
//   age: number
// } = {
//   const person: {
//     name: string
//     age: number
//     hobbies: string[]
//     role: [number, string]
//   } = {
//   name: 'Maximilian',
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author']
// }

// const ADMIN = 'ADMIN'
// const ADMIN = 'ADMIN'
// const ADMIN = 'ADMIN'

enum Role { ADMIN, READ_ONLY, AUTHOR }


const person = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
}

let favoriteActivities : string[]
favoriteActivities = ['Sports']

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase())
}

// console.log(favoriteActivities)

// if(person.role === Role.AUTHOR)