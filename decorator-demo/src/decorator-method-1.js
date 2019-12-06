function readOnly(target, key, descriptor) {
    descriptor.writable = false
    return descriptor
}

class Dog {
    @readOnly
    bark() {
        console.log('wang wang~')
    }
}

const dog = new Dog()

dog.bark = function() {
    console.log('miao~')
}

dog.bark()