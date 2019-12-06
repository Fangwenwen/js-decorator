"use strict";

var _dec, _class, _dec2, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isAnimal(val) {
  return function (target) {
    target.isAnimal = val;
  };
}

var Dog = (_dec = isAnimal(true), _dec(_class = function Dog() {
  _classCallCheck(this, Dog);
}) || _class);
console.log('Dog', Dog.isAnimal);
var Person = (_dec2 = isAnimal(false), _dec2(_class2 = function Person() {
  _classCallCheck(this, Person);
}) || _class2);
console.log('Person', Person.isAnimal);