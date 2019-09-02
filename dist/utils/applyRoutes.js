"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRoutes = function (routes, router) {
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var route = routes_1[_i];
        var method = route.method, path = route.path, handler = route.handler;
        router[method](path, handler);
    }
};
//# sourceMappingURL=applyRoutes.js.map