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
exports.Route = (options) => {
    return (target, propertyKey) => {
        const metakey = {
            routes: `${target.constructor.name}:routes`,
            prefix: `${target.constructor.name}:prefix`,
            middlewares: `${target.constructor.name}:middlewares`,
        };
        let handler = [];
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
            Reflect.defineMetadata(metakey.routes, express.Router(), target.constructor);
        }
        const routes = Reflect.getMetadata(metakey.routes, target.constructor);
        middlewares.before.forEach((middleware) => {
            handler.push(middleware);
        });
        handler.push(new target.constructor()[propertyKey]);
        middlewares.after.forEach((middleware) => {
            handler.push(middleware);
        });
        middlewares.error.forEach((middleware) => {
            handler.push(middleware);
        });
        routes.route(`${options.path}`)[options.method](handler);
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
        let handler = [];
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
            Reflect.defineMetadata(metakey.routes, express.Router(), target.constructor);
        }
        const routes = Reflect.getMetadata(metakey.routes, target.constructor);
        middlewares.before.forEach((middleware) => {
            handler.push(middleware);
        });
        handler.push(new target.constructor()[propertyKey]);
        middlewares.after.forEach((middleware) => {
            handler.push(middleware);
        });
        middlewares.error.forEach((middleware) => {
            handler.push(middleware);
        });
        routes.route(`/`)[method](handler);
        Reflect.defineMetadata(metakey.routes, routes, target.constructor);
    };
};
