"use strict";
exports.__esModule = true;
// backend/src/index.ts
var shared_1 = require("shared");
var user = (0, shared_1.createUser)('eddie', 1000);
(0, shared_1.showUser)(user);
