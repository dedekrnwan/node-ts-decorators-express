import * as express from "express";
import { IMiddlewares,IRoutes } from "../interfaces";

export default (app:express.Application, controllers:Array<any> , uses:string=''):Promise<any> => { 
    return new Promise(async (resolve, reject) => {
       try {
            await controllers.forEach( async(controller:any) => {
                let metakey:any = {
                    routes: `${controller.name}:routes`,
                    prefix: `${controller.name}:prefix`,
                    middlewares: `${controller.name}:middlewares`,
                }
                const instance = await new controller();
                const prefix = await Reflect.getMetadata(metakey.prefix, controller);
                const routes:Array<IRoutes> = await Reflect.getMetadata(metakey.routes, controller);
                const router:any = await  express.Router(); 
                routes.forEach(async (route:any) => {
                    let middlewares:IMiddlewares = await  Reflect.getMetadata(metakey.middlewares, controller, route.function) || <IMiddlewares> {
                        before: [],
                        after: [],
                        error: []
                    };
                    let handler:express.RequestHandler= await <express.RequestHandler> instance[route.function];
                    await router.route(`${route.path}`)[route.method]([...middlewares.before, handler, ...middlewares.after, ...middlewares.error]) 
                    await app.use(`${uses}${prefix}`, router);
                });
            })
            resolve(app);
       } catch (error) {
            reject(error);
       }
    })
}