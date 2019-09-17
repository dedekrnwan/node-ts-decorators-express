import * as express from "express";
import { IMiddlewares, IRoutes } from "../interfaces";

export const Route = (options:IRoutes) => {
    return (target:any, propertyKey:string):void => {
        const metakey:any = {
            routes: `${target.constructor.name}:routes`,
            prefix: `${target.constructor.name}:prefix`,
            middlewares: `${target.constructor.name}:middlewares`,
        }
        //declaring routes
        if(!Reflect.hasMetadata(metakey.routes, target.constructor)){
            Reflect.defineMetadata(metakey.routes, [], target.constructor)
        }
        const routes = Reflect.getMetadata(metakey.routes, target.constructor);
        
        routes.push(<IRoutes>{
            path: options.path,
            method: options.method,
            function: propertyKey
        })
        Reflect.defineMetadata(metakey.routes, routes , target.constructor);
    }
}
export const Root = (method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'checkout' | 'copy' | 'delete' | 'get' | 'head'
| 'lock' | 'merge' | 'mkactivity' | 'mkcol' | 'move' | 'm-search' | 'notify' | 'options' | 'purge' | 'report' | 'search'
| 'subscribe' | 'trace' | 'unlock' | 'unsubscribe') => {
    return (target:any, propertyKey:string):void => {
        const metakey:any = {
            routes: `${target.constructor.name}:routes`,
            prefix: `${target.constructor.name}:prefix`,
            middlewares: `${target.constructor.name}:middlewares`,
        }
        if(!Reflect.hasMetadata(metakey.routes, target.constructor)){
            Reflect.defineMetadata(metakey.routes,[], target.constructor)
        }
        const routes:Array<IRoutes> = Reflect.getMetadata(metakey.routes, target.constructor);
        routes.push(<IRoutes>{
            path: `/`,
            method: method,
            function: propertyKey
        })
        Reflect.defineMetadata(metakey.routes, routes , target.constructor);
    }
}