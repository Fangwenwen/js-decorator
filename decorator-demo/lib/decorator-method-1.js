"use strict";

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function readOnly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

var Dog = (_class =
/*#__PURE__*/
function () {
  function Dog() {
    _classCallCheck(this, Dog);
  }

  _createClass(Dog, [{
    key: "bark",
    value: function bark() {
      console.log('wang wang~');
    }
  }]);

  return Dog;
}(), (_applyDecoratedDescriptor(_class.prototype, "bark", [readOnly], Object.getOwnPropertyDescriptor(_class.prototype, "bark"), _class.prototype)), _class);
var dog = new Dog();

dog.bark = function () {
  console.log('miao~');
};

dog.bark();