"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = (options) => {
    return (target, propertyKey) => {
        const metakey = {
            routes: `${target.constructor.name}:routes`,
            prefix: `${target.constructor.name}:prefix`,
            middlewares: `${target.constructor.name}:middlewares`,
        };
        // let handler:Array<any> = [];
        //declaring middlewares
        if (!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)) {
            Reflect.defineMetadata(metakey.middlewares, {
                before: [],
                after: [],
                error: [],
            }, target.constructor, propertyKey);
        }
        let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor, propertyKey);
        //declaring routes
        if (!Reflect.hasMetadata(metakey.routes, target.constructor)) {
            // Reflect.defineMetadata(metakey.routes, express.Router(), target.constructor)
            Reflect.defineMetadata(metakey.routes, {}, target.constructor);
        }
        const routes = Reflect.getMetadata(metakey.routes, target.constructor);
        // middlewares.before.forEach((middleware:any) => {
        //     handler.push(middleware)
        // });
        // handler.push(new target.constructor()[propertyKey]);
        // middlewares.after.forEach((middleware:any) => {
        //     handler.push(middleware)
        // });
        // middlewares.error.forEach((middleware:any) => {
        //     handler.push(middleware)
        // });
        // routes.route(`${options.path}`)[options.method](handler)
        routes.push({
            path: options.path,
            method: options.method,
            function: propertyKey
        });
        Reflect.defineMetadata(metakey.routes, routes, target.constructor);
    };
};
exports.Root = (method = 'get') => {
    return (target, propertyKey) => {
        const metakey = {
            routes: `${target.constructor.name}:routes`,
            prefix: `${target.constructor.name}:prefix`,
            middlewares: `${target.constructor.name}:middlewares`,
        };
        // let handler:Array<any> = [];
        //declaring middlewares
        if (!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)) {
            Reflect.defineMetadata(metakey.middlewares, {
                before: [],
                after: [],
                error: [],
            }, target.constructor, propertyKey);
        }
        let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor, propertyKey);
        //declaring routes
        if (!Reflect.hasMetadata(metakey.routes, target.constructor)) {
            // Reflect.defineMetadata(metakey.routes, express.Router(), target.constructor)
            Reflect.defineMetadata(metakey.routes, [], target.constructor);
        }
        const routes = Reflect.getMetadata(metakey.routes, target.constructor);
        // middlewares.before.forEach((middleware:any) => {
        //     handler.push(middleware)
        // });
        // handler.push(new target.constructor()[propertyKey]);
        // middlewares.after.forEach((middleware:any) => {
        //     handler.push(middleware)
        // });
        // middlewares.error.forEach((middleware:any) => {
        //     handler.push(middleware)
        // });
        // routes.route(`/`)[method](handler)
        routes.push({
            path: `/`,
            method: method,
            function: propertyKey
        });
        Reflect.defineMetadata(metakey.routes, routes, target.constructor);
    };
};
