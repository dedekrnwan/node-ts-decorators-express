import * as express from "express";
import { IMiddlewares } from "../interfaces";

export default (app:express.Application, controllers:Array<Function> , uses:string=''):any => { //Type must class
    controllers.forEach((controller:any) => {
        let metakey:any = {
            routes: `${controller.name}:routes`,
            prefix: `${controller.name}:prefix`,
        }
        const instance = new controller();
        const prefix = Reflect.getMetadata(metakey.prefix, controller);
        const route:express.Router = Reflect.getMetadata(metakey.routes, controller);
        app.use(`${uses}${prefix}`, route);
    })
    return app;
}