## Decorators Express

Project implements decorators for modern tools for NodeJS like 
[ExpressJS]

## Installation

```
npm install @dedekrnwan/decorators-express --save
```

## Example of usage
Here's example of usage with Express framework. It uses TypeScript and `@dedekrnwan/decorators-express` package
`Controller`

```typescript
import * as express from "express";
import hException from "./../../helper/exception.helper";
import HResponse from "./../../helper/response.helper";

import { Jwt } from "./../../middleware/auth.middleware";

import { Controller, RouteMiddleware, Root, Route, IRoutes, IMiddlewares } from "@dedekrnwan/decorators-express";

@Controller('/welcome')
class WelcomeController {
    constructor(){
    }
    @Root()
    @RouteMiddleware.before(new Jwt().authenticated)
    index = async (request:express.Request, response:express.Response, next:express.NextFunction):Promise<any> => {
        try {
            next(new HResponse().ok(`Mantab`,{}))
        } catch (error) {
            next(new hException(error))
        }
    }
    @Route(<IRoutes> {
        path: '/testing',
        method: 'get'
    })
    testing = async (request:express.Request, response:express.Response, next:express.NextFunction):Promise<any> => {
        try {
            next(new HResponse().ok(`Mantab testing path`,{}))
        } catch (error) {
            next(new hException(error))
        }
    }
}

export default WelcomeController
```

`Express App`
```typescript
import * as express from "express";
import * as path from "path";

import * as Config from "./../app/config";

import { Database } from "./../app/services";
import { Error } from "./../app/interfaces";


import { RouteMiddleware, Attach, IRoutes, IMiddlewares } from "@dedekrnwan/decorators-express";
import * as Middlewares from "./../app/middleware";
import * as Controllers from "./../app/controller"

class App {
    app:express.Application
    constructor(){
        this.app = express()
        this.middlewares()
    }
    middlewares = async () => {
        try {
            this.app = await Middlewares.before(this.app);

            Attach.Controller(this.app,[
                Controllers.WelcomeController,
                Controllers.AuthController,
            ]).then((app) => {
                this.app = app;
            }).catch((error) => {
                throw error;
            })
    
            this.app =  await Middlewares.error(this.app);
            this.app =  await Middlewares.after(this.app);
        } catch (error) {
            throw error
        }
    }
    run = async (port:number) => {
        try {
            this.app.listen(port, () => {
                console.log(`${Config.Server.name} listening on the port ${port}`)
            }).on('error' , async (err:Error) => {
                let another_port = [8080, 80, 3000, 4000, 5000]; 
                let next = another_port[Math.floor(Math.random() * another_port.length)];
                if(err.code == 'EADDRINUSE')
                    console.error(`${Config.Server.name} failed listening on the port ${err['port']}`)
                    console.log(`${Config.Server.name} try listening on the port ${next}`)
                    await this.run(next)
            })
        } catch (error) {
            throw error;
        }
    }
}

export default App
```

## Documentation
Look at the corresponding package for instructions

[ExpressJS]:http://expressjs.com
[Reflect-Metadata]:https://www.npmjs.com/package/reflect-metadata