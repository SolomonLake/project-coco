"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
exports.middleware = [
    common_1.handleCors,
    common_1.handleBodyRequestParsing,
    common_1.handleCompression,
];
//# sourceMappingURL=middleware.js.map