"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, controllers, uses = '') => {
    controllers.forEach((controller) => {
        let metakey = {
            routes: `${controller.name}:routes`,
            prefix: `${controller.name}:prefix`,
        };
        const instance = new controller();
        const prefix = Reflect.getMetadata(metakey.prefix, controller);
        const route = Reflect.getMetadata(metakey.routes, controller);
        app.use(`${uses}${prefix}`, route);
    });
    return app;
};
