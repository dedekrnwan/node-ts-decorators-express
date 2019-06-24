import "reflect-metadata"
import * as express from "express";

import { IRoutes, IMiddlewares } from "./interfaces";

//#region Controller
const Controller = (prefix:string):ClassDecorator => {
    return (target:any):void => {
        const metakey:any = {
            routes: `${target.name}:routes`,
            prefix: `${target.name}:prefix`,
        }
        Reflect.defineMetadata(metakey.prefix, prefix, target)
        prefix = Reflect.getMetadata(metakey.prefix,target)
        //routes
        if(!Reflect.hasMetadata(metakey.routes,target)){
            Reflect.defineMetadata(metakey.routes,express.Router(),target)
        }
    }
}

//#endregion

//#region Middleware
const RouteMiddleware = {
    before: (middleware:Function | Array<Function>) => {
        return (target:any, propertyKey:string):void => {
            const metakey:any = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            }
            let handlers:Array<Function>;
            //declaring middlewares
            if(!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)){
                Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                    before: [],
                    after: [],
                    error: [],
                } ,target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares,target.constructor, propertyKey)
            switch (typeof middleware) {
                case 'function':
                    middlewares.before.push(middleware)
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.before.push(func)
                    });
                    break;
                default:
                    //as function
                    middlewares.before.push(middleware)
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor, propertyKey);
        }
    },
    after: (middleware:Function | Array<Function>) => {
        return (target:any, propertyKey:string):void => {
            const metakey:any = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            }
            let handlers:Array<Function>;
            //declaring middlewares
            if(!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)){
                Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                    before: [],
                    after: [],
                    error: [],
                } ,target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares,target.constructor, propertyKey)
            switch (typeof middleware) {
                case 'function':
                    middlewares.after.push(middleware)
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.after.push(func)
                    });
                    break;
                default:
                    //as function
                    middlewares.after.push(middleware)
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor, propertyKey);
        }
    },
    error: (middleware:Function | Array<Function>) => {
        return (target:any, propertyKey:string):void => {
            const metakey:any = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            }
            let handlers:Array<Function>;
            //declaring middlewares
            if(!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)){
                Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                    before: [],
                    after: [],
                    error: [],
                } ,target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares,target.constructor, propertyKey)
            switch (typeof middleware) {
                case 'function':
                    middlewares.error.push(middleware)
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.error.push(func)
                    });
                    break;
                default:
                    //as function
                    middlewares.error.push(middleware)
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor, propertyKey);
        }
    },  
}

const AppMiddleware = {
    before: (middleware:Function | Array<Function>) => {
        return (target:any):void => {
            const metakey:any = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            }
            let handlers:Array<Function>;
            //declaring middlewares
            if(!Reflect.hasMetadata(metakey.middlewares, target.constructor)){
                Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                    before: [],
                    after: [],
                    error: [],
                } ,target.constructor);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares,target.constructor)
            switch (typeof middleware) {
                case 'function':
                    middlewares.before.push(middleware)
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.before.push(func)
                    });
                    break;
                default:
                    //as function
                    middlewares.before.push(middleware)
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor);
        }
    },
    after: (middleware:Function | Array<Function>) => {
        return (target:any, propertyKey:string):void => {
            const metakey:any = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            }
            let handlers:Array<Function>;
            //declaring middlewares
            if(!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)){
                Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                    before: [],
                    after: [],
                    error: [],
                } ,target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares,target.constructor)
            switch (typeof middleware) {
                case 'function':
                    middlewares.after.push(middleware)
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.after.push(func)
                    });
                    break;
                default:
                    //as function
                    middlewares.after.push(middleware)
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor);
        }
    },
    error: (middleware:Function | Array<Function>) => {
        return (target:any, propertyKey:string):void => {
            const metakey:any = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            }
            let handlers:Array<Function>;
            //declaring middlewares
            if(!Reflect.hasMetadata(metakey.middlewares, target.constructor)){
                Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                    before: [],
                    after: [],
                    error: [],
                } ,target.constructor, propertyKey);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares,target.constructor)
            switch (typeof middleware) {
                case 'function':
                    middlewares.error.push(middleware)
                    break;
                case 'object':
                    middleware.forEach(func => {
                        middlewares.error.push(func)
                    });
                    break;
                default:
                    //as function
                    middlewares.error.push(middleware)
                    break;
            }
            //after adding middleware to current property object as metadata
            Reflect.defineMetadata(metakey.middlewares, middlewares, target.constructor);
        }
    },  
}
//#endregion

//#region Route
const Route = (options:any) => {
    return (target:any, propertyKey:string):void => {
        const metakey:any = {
            routes: `${target.constructor.name}:routes`,
            prefix: `${target.constructor.name}:prefix`,
            middlewares: `${target.constructor.name}:middlewares`,
        }
      
        let handler:Array<any> = [];
    
        //declaring middlewares
        if(!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)){
            Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                before: [],
                after: [],
                error: [],
            } , target.constructor, propertyKey)
        }
        let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor, propertyKey)
        //declaring routes
        if(!Reflect.hasMetadata(metakey.routes, target.constructor)){
            Reflect.defineMetadata(metakey.routes, express.Router(), target.constructor)
        }
        const routes = Reflect.getMetadata(metakey.routes, target.constructor);
        
        middlewares.before.forEach((middleware:any) => {
            handler.push(middleware)
        });
        handler.push(new target.constructor()[propertyKey]);
        middlewares.after.forEach((middleware:any) => {
            handler.push(middleware)
        });
        middlewares.error.forEach((middleware:any) => {
            handler.push(middleware)
        });
        routes.route(`${options.path}`)[options.method](handler)
        Reflect.defineMetadata(metakey.routes, routes , target.constructor);
    }
}
const Root = (method: 'get' | 'post' | 'patch' | 'put' | 'delete' = 'get') => {
    return (target:any, propertyKey:string):void => {
        const metakey:any = {
            routes: `${target.constructor.name}:routes`,
            prefix: `${target.constructor.name}:prefix`,
            middlewares: `${target.constructor.name}:middlewares`,
        }
      
        let handler:Array<any> = [];
    
        //declaring middlewares
        if(!Reflect.hasMetadata(metakey.middlewares, target.constructor, propertyKey)){
            Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                before: [],
                after: [],
                error: [],
            } , target.constructor, propertyKey)
        }
        let middlewares = Reflect.getMetadata(metakey.middlewares, target.constructor, propertyKey)
        //declaring routes
        if(!Reflect.hasMetadata(metakey.routes, target.constructor)){
            Reflect.defineMetadata(metakey.routes, express.Router(), target.constructor)
        }
        const routes = Reflect.getMetadata(metakey.routes, target.constructor);
        
        middlewares.before.forEach((middleware:any) => {
            handler.push(middleware)
        });
        handler.push(new target.constructor()[propertyKey]);
        middlewares.after.forEach((middleware:any) => {
            handler.push(middleware)
        });
        middlewares.error.forEach((middleware:any) => {
            handler.push(middleware)
        });
        routes.route(`/`)[method](handler)
        Reflect.defineMetadata(metakey.routes, routes , target.constructor);
    }
}
//#endregion

export {
    Controller,
    RouteMiddleware,
    AppMiddleware,
    Route,
    Root
}