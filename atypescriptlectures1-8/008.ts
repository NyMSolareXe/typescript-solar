// function Logger(constructor: Function) {
//   console.log('Logging...')
//   // console.log(constructor)
// }

function Logger(logString: string) {
  console.log('LOGGER FACTORY')
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY')
  return function<T extends {new(...args: any[]) : {name: string}}>(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super()
        console.log('Rendering Template')
        const hookEl = document.getElementById(hookId)
        // const p = new originalConstructor()
        if(hookEl) {
          hookEl.innerHTML = template
          // hookEl.querySelector('h1')!.textContent = p.name
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}

// function omega() {
//   console.log('hey u')
//   return function(constructor: any) {
//     console.log('ok man')
//   }
// }

// @Logger('LOGGING')
// // @omega()
// @WithTemplate('<h1>My Person Object</h1>', 'app')
// class Person {
//   name = 'Max'

//   constructor() {
//     console.log('Creating person object...')
//   }

//   solarity() {
//     console.log('Solarity')
//   }
// }
// const pers = new Person()
// console.log(pers)






// function Log(target: any, propertyName: string | Symbol) {
//   console.log('Property Decorator')
//   console.log(target, propertyName)
// }

// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log('Accessor Decorator')
//   console.log(target)
//   console.log(name)
//   console.log(descriptor)
// }

// function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
//   console.log('Method Decorator')
//   console.log(target)
//   console.log(name)
//   console.log(descriptor)
// }

// function Log4(target: any, name: string | Symbol, position: number) {
//   console.log('Parameter Decorator')
//   console.log(target)
//   console.log(name)
//   console.log(position)
// }



// class Product {
//   @Log
//   title: string
//   private _price: number

//   @Log2
//   set price(val: number) {
//     if(val > 0) {
//       this._price = val
//     } else {
//       throw new Error('Invalid Price - should be positive')
//     }
//   }

//   constructor(t: string, p: number) {
//     this.title = t
//     this._price = p
//   }

//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this._price * (1 + tax)
//   }

// }

// const p1 = new Product('Book', 19)
// const p2 = new Product('Book2', 25)


function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjDescriptor
}


class Printer {
  message = 'This works!'

  @Autobind
  showMessage() {
    console.log((this.message))
  }
}

const p = new Printer()

const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)

// ---


interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['Required', 'Positive']
  }
}

const registeredValidators: ValidatorConfig = {}

function Requireds(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if(!objValidatorConfig) {
    return true
  }

  let isValid = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch(validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
          break
        case 'positive':
          isValid = isValid && obj[prop] > 0
          break
      }
    }
  }
  return isValid
}


class Course {
  @Requireds
  title: string
  @PositiveNumber
  price: number
  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}


const courseForm = document.querySelector('form')!


courseForm.addEventListener('submit', event => {
  event.preventDefault()
  const titleEL = document.getElementById('title') as HTMLInputElement
  const priceEL = document.getElementById('price') as HTMLInputElement

  const title = titleEL.value
  const price = +priceEL.value



  const createdCourse = new Course(title, price)
  if(!validate(createdCourse)) {
    alert('Invalid Input sorry')
    return
  }
  console.log(createdCourse)
})


