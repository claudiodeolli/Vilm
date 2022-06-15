"use strict";

var _navBar = _interopRequireDefault(require("./nav-bar.js"));

var _mainPage = _interopRequireDefault(require("../../../pages/main-page.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock('./nav-bar.js');
beforeEach(function () {
  _navBar["default"].mockClear();
});
it('Constructor has been called', function () {
  var navBarConsumer = new _mainPage["default"]();
  expect(_navBar["default"]).toHaveBeenCalledTimes(1);
});