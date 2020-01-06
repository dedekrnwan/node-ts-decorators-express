"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteMiddleware = {
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
};
exports.ControllerMiddleware = {
    before: (middleware) => {
        return (target) => {
            const metakey = {
                routes: `${target.name}:routes`,
                prefix: `${target.name}:prefix`,
                middlewares: `${target.name}:middlewares`,
            };
            let handlers;
            //declaring middlewares
            if (!Reflect.hasMetadata(metakey.middlewares, target)) {
                Reflect.defineMetadata(metakey.middlewares, {
                    before: [],
                    after: [],
                    error: [],
                }, target);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares, target);
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
            Reflect.defineMetadata(metakey.middlewares, middlewares, target);
        };
    },
    after: (middleware) => {
        return (target) => {
            const metakey = {
                routes: `${target.name}:routes`,
                prefix: `${target.name}:prefix`,
                middlewares: `${target.name}:middlewares`,
            };
            let handlers;
            //declaring middlewares
            if (!Reflect.hasMetadata(metakey.middlewares, target)) {
                Reflect.defineMetadata(metakey.middlewares, {
                    before: [],
                    after: [],
                    error: [],
                }, target);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares, target);
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
            Reflect.defineMetadata(metakey.middlewares, middlewares, target);
        };
    },
};
