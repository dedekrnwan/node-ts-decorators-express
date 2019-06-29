"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
exports.default = (app, controllers, uses = '') => {
    return new Promise((resolve, reject) => {
        try {
            controllers.forEach((controller) => {
                let metakey = {
                    routes: `${controller.name}:routes`,
                    prefix: `${controller.name}:prefix`,
                    middlewares: `${controller.name}:middlewares`,
                };
                const instance = new controller();
                const prefix = Reflect.getMetadata(metakey.prefix, controller);
                const routes = Reflect.getMetadata(metakey.routes, controller);
                const router = express.Router();
                routes.forEach((route) => {
                    let middlewares = Reflect.getMetadata(metakey.middlewares, controller, route.function);
                    let handler = instance[route.function];
                    router.route(`${route.path}`)[route.method]([...middlewares.before, handler, ...middlewares.after, ...middlewares.error]);
                    app.use(`${uses}${prefix}`, router);
                });
            });
            resolve(app);
        }
        catch (error) {
            reject(error);
        }
    });
};
