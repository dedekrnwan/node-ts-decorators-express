import * as express from "express";
import { IMiddlewares,IRoutes } from "../interfaces";

export default (app:express.Application, controllers:Array<any> , uses:string=''):Promise<any> => { 
    return new Promise((resolve, reject) => {
       try {
            controllers.forEach((controller:any) => {
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
                    let middlewares:IMiddlewares = Reflect.getMetadata(metakey.middlewares, controller, route.function);
                    let handler:express.RequestHandler= <express.RequestHandler> instance[route.function];
                    router.route(`${route.path}`)[route.method]([...middlewares.before, handler, ...middlewares.after, ...middlewares.error]) 
                    app.use(`${uses}${prefix}`, router);
                });
            })
            resolve(app);
       } catch (error) {
            reject(error);
       }
    })
}