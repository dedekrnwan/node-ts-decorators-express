
import * as express from "express";
import { IRoutes } from "./../interfaces";
export const Controller = (prefix:string):ClassDecorator => {
    return (target:any):void => {
        const metakey:any = {
            routes: `${target.name}:routes`,
            prefix: `${target.name}:prefix`,
        }
        Reflect.defineMetadata(metakey.prefix, prefix, target)
        prefix = Reflect.getMetadata(metakey.prefix,target)
        //routes
        if(!Reflect.hasMetadata(metakey.routes,target)){
            Reflect.defineMetadata(metakey.routes, [] ,target)
        }
    }
}