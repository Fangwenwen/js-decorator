"use strict";

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isAnimal(target) {
  target.isAnimal = true;
  return target;
}

var Dog = isAnimal(_class = function Dog() {
  _classCallCheck(this, Dog);
}) || _class;

console.log('Dog', Dog.isAnimal);