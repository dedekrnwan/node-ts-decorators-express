"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = (options) => {
    return (target, propertyKey) => {
        const metakey = {
            routes: `${target.constructor.name}:routes`,
            prefix: `${target.constructor.name}:prefix`,
            middlewares: `${target.constructor.name}:middlewares`,
        };
        //declaring routes
        if (!Reflect.hasMetadata(metakey.routes, target.constructor)) {
            Reflect.defineMetadata(metakey.routes, [], target.constructor);
        }
        const routes = Reflect.getMetadata(metakey.routes, target.constructor);
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
        if (!Reflect.hasMetadata(metakey.routes, target.constructor)) {
            Reflect.defineMetadata(metakey.routes, [], target.constructor);
        }
        const routes = Reflect.getMetadata(metakey.routes, target.constructor);
        routes.push({
            path: `/`,
            method: method,
            function: propertyKey
        });
        Reflect.defineMetadata(metakey.routes, routes, target.constructor);
    };
};
