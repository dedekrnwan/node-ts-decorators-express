import * as express from "express";
import { IMiddlewares, IRoutes } from "./../interfaces";

export const RouteMiddleware = {
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
}
export const ControllerMiddleware = {
    before:  (middleware:Function | Array<Function>):ClassDecorator => {
        return (target:any):void => {
            const metakey:any = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            }
            let handlers:Array<Function>;
            //declaring middlewares
            if(!Reflect.hasMetadata(metakey.middlewares, target)){
                Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                    before: [],
                    after: [],
                    error: [],
                } ,target);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares,target)
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
            Reflect.defineMetadata(metakey.middlewares, middlewares, target);
        }
    },
    after:  (middleware:Function | Array<Function>):ClassDecorator => {
        return (target:any):void => {
            const metakey:any = {
                routes: `${target.constructor.name}:routes`,
                prefix: `${target.constructor.name}:prefix`,
                middlewares: `${target.constructor.name}:middlewares`,
            }
            let handlers:Array<Function>;
            //declaring middlewares
            if(!Reflect.hasMetadata(metakey.middlewares, target)){
                Reflect.defineMetadata(metakey.middlewares, <IMiddlewares> {
                    before: [],
                    after: [],
                    error: [],
                } ,target);
            }
            let middlewares = Reflect.getMetadata(metakey.middlewares,target)
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
            Reflect.defineMetadata(metakey.middlewares, middlewares, target);
        }
    },
}