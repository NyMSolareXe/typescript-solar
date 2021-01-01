interface Person {
  name: string
  age: number

  greet(phase: string): void
  greet3: (rush: string) => void
}

let user1: Person
user1 = {
  name: 'Danny',
  age: 25,
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`)
  },
  greet3: (rush) => {
    console.log(`Greet3 Started ${rush}`)
  }
}

user1.greet('Sup')
user1.greet3('never')