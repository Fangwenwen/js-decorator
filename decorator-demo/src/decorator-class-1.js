function isAnimal(target) {
    target.isAnimal = true
    return target
}

@isAnimal
class Dog {

}

console.log('Dog', Dog.isAnimal)