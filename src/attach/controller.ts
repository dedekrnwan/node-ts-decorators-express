import * as express from "express";
import { IMiddlewares,IRoutes } from "../interfaces";

interface Controller extends Function {
    new (...args: any[]):any
}
interface IAttachControllers {
    app:express.Application,
    controllers:Controller[],
    uses?:string
}

export default (params:IAttachControllers, callback: (app:express.Application) => express.Application) => { 
    params.controllers.forEach((controller:any) => {
        let metakey:any = {
            routes: `${controller.name}:routes`,
            prefix: `${controller.name}:prefix`,
            middlewares: `${controller.name}:middlewares`,
        }
        const instance = new controller();
        const prefix = Reflect.getMetadata(metakey.prefix, controller);
        const routes:Array<IRoutes> = Reflect.getMetadata(metakey.routes, controller);
        const router:any = express.Router(); 
        routes.forEach((route:any) => {
            //metadata class middleware
            let middlewares_class:IMiddlewares = Reflect.getMetadata(metakey.middlewares, controller);
            //metadata method middleware
            let middlewares:IMiddlewares = Reflect.getMetadata(metakey.middlewares, controller, route.function);
            //metadata route of method
            let handler:express.RequestHandler= <express.RequestHandler> instance[route.function];
            router.route(`${route.path}`)[route.method]([...middlewares_class.before,...middlewares.before, handler, ...middlewares.after, ...middlewares_class.after,...middlewares.error, ...middlewares_class.error]) 
            params.app.use(`${params.uses || ``}${prefix}`, router);
        });
    })
    callback(params.app)
}