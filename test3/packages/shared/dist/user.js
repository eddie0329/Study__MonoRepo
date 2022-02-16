"use strict";
exports.__esModule = true;
exports.showUser = exports.createUser = void 0;
var createUser = function (name, age) { return ({ name: name, age: age }); };
exports.createUser = createUser;
var showUser = function (user) { return console.log("".concat(user.name, " is ").concat(user.age, " years old.")); };
exports.showUser = showUser;
//# sourceMappingURL=user.js.map