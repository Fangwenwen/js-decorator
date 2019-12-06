"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 箭头函数
var arrowFun = function arrowFun() {
  console.log('箭头函数');
};

var Dog =
/*#__PURE__*/
function () {
  function Dog() {
    _classCallCheck(this, Dog);
  }

  _createClass(Dog, [{
    key: "bark",
    value: function bark() {
      console.log('wang');
    }
  }]);

  return Dog;
}();