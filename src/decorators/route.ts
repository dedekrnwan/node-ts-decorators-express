import * as express from "express";
import { IMiddlewares, IRoutes } from "../interfaces";

export const Route = (options:any) => {
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
export const Root = (method: 'get' | 'post' | 'patch' | 'put' | 'delete' = 'get') => {
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