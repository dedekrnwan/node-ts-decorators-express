"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = __importStar(require("express"));
//#region Controller
const Controller = (prefix) => {
    return (target) => {
        const metakey = {
            routes: `${target.name}:routes`,
            prefix: `${target.name}:prefix`,
        };
        Reflect.defineMetadata(metakey.prefix, prefix, target);
        prefix = Reflect.getMetadata(metakey.prefix, target);
        //routes
        if (!Reflect.hasMetadata(metakey.routes, target)) {
            Reflect.defineMetadata(metakey.routes, express.Router(), target);
        }
    };
};
exports.Controller = Controller;
//#endregion
//#region Middleware
const RouteMiddleware = {
    before: (middleware) => {
        return (target, propertyKey) => {
            const metakey = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            };
            let handlers;
            //declaring middlewares
            if (!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)) {
                Reflect.defineMetadata(metakey.middlewares, {
                    before: [],
                    after: [],
                    error: [],
                }, target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor, propertyKey);
            switch (typeof middleware) {
                case 'function':
                    middlewares.before.push(middleware);
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.before.push(func);
                    });
                    break;
                default:
                    //as function
                    middlewares.before.push(middleware);
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor, propertyKey);
        };
    },
    after: (middleware) => {
        return (target, propertyKey) => {
            const metakey = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            };
            let handlers;
            //declaring middlewares
            if (!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)) {
                Reflect.defineMetadata(metakey.middlewares, {
                    before: [],
                    after: [],
                    error: [],
                }, target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor, propertyKey);
            switch (typeof middleware) {
                case 'function':
                    middlewares.after.push(middleware);
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.after.push(func);
                    });
                    break;
                default:
                    //as function
                    middlewares.after.push(middleware);
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor, propertyKey);
        };
    },
    error: (middleware) => {
        return (target, propertyKey) => {
            const metakey = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            };
            let handlers;
            //declaring middlewares
            if (!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)) {
                Reflect.defineMetadata(metakey.middlewares, {
                    before: [],
                    after: [],
                    error: [],
                }, target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor, propertyKey);
            switch (typeof middleware) {
                case 'function':
                    middlewares.error.push(middleware);
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.error.push(func);
                    });
                    break;
                default:
                    //as function
                    middlewares.error.push(middleware);
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor, propertyKey);
        };
    },
};
exports.RouteMiddleware = RouteMiddleware;
const AppMiddleware = {
    before: (middleware) => {
        return (target) => {
            const metakey = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            };
            let handlers;
            //declaring middlewares
            if (!Reflect.hasMetadata(metakey.middlewares, target.constructor)) {
                Reflect.defineMetadata(metakey.middlewares, {
                    before: [],
                    after: [],
                    error: [],
                }, target.constructor);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor);
            switch (typeof middleware) {
                case 'function':
                    middlewares.before.push(middleware);
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.before.push(func);
                    });
                    break;
                default:
                    //as function
                    middlewares.before.push(middleware);
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor);
        };
    },
    after: (middleware) => {
        return (target, propertyKey) => {
            const metakey = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            };
            let handlers;
            //declaring middlewares
            if (!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)) {
                Reflect.defineMetadata(metakey.middlewares, {
                    before: [],
                    after: [],
                    error: [],
                }, target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor);
            switch (typeof middleware) {
                case 'function':
                    middlewares.after.push(middleware);
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.after.push(func);
                    });
                    break;
                default:
                    //as function
                    middlewares.after.push(middleware);
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor);
        };
    },
    error: (middleware) => {
        return (target, propertyKey) => {
            const metakey = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            };
            let handlers;
            //declaring middlewares
            if (!Reflect.hasMetadata(metakey.middlewares, target.constructor)) {
                Reflect.defineMetadata(metakey.middlewares, {
                    before: [],
                    after: [],
                    error: [],
                }, target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor);
            switch (typeof middleware) {
                case 'function':
                    middlewares.error.push(middleware);
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.error.push(func);
                    });
                    break;
                default:
                    //as function
                    middlewares.error.push(middleware);
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor);
        };
    },
};
exports.AppMiddleware = AppMiddleware;
//#endregion
//#region Route
const Route = (options) => {
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
exports.Route = Route;
const Root = (method = 'get') => {
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
exports.Root = Root;
