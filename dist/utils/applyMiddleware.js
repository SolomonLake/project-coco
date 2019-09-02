"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddleware = function (middleware, router) {
    for (var _i = 0, middleware_1 = middleware; _i < middleware_1.length; _i++) {
        var f = middleware_1[_i];
        f(router);
    }
};
//# sourceMappingURL=applyMiddleware.js.map