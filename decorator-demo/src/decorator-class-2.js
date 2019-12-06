function isAnimal(val) {
    return (target) => {
        target.isAnimal = val
    }
}

@isAnimal(true)
class Dog {

}

console.log('Dog', Dog.isAnimal)

@isAnimal(false)
class Person {

}

console.log('Person', Person.isAnimal)