function readOnly(val) {
    return (target, key, descriptor) => {
        descriptor.writable = val
    }
}

class Dog {
    @readOnly(true)
    bark() {
        console.log('wang wang~')
    }
}

const dog = new Dog()

dog.bark = function() {
    console.log('miao~')
}

dog.bark()