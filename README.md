![Decorators Express]

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
// import Controller from "./../../../vendor/controller";
import * as express from "express";
import hException from "./../../helper/exception.helper";
import HResponse from "./../../helper/response.helper";

import  { Controller } from "./../../../vendor/decorators/controller.decorator";
import { Routes } from "./../../../vendor/decorators/routes.decorator";
import { Middleware } from "./../../../vendor/decorators/middleware.decorator";
import { Root } from "../../../vendor/decorators/root.decorator";

import {IRoutes} from "./../../../vendor/interfaces/routes.interface";

import { Jwt } from "./../../middleware/auth.middleware";

@Controller('/welcome')
class WelcomeController {
    constructor(){
    }
    @Root()
    @Middleware.before(new Jwt().authenticated)
    index = async (request:express.Request, response:express.Response, next:express.NextFunction):Promise<any> => {
        try {
            next(new HResponse().ok(`Mantab`,{}))
        } catch (error) {
            next(new hException(error))
        }
    }
    @Routes(<IRoutes> {
        path: '/testing',
        method: 'get'
    })
    // @Middleware.before(new Jwt().authenticated)
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
import "reflect-metadata";
import * as express from "express";
import cServer from "./../app/config/server.config";
import Error from "./../app/interfaces/error.interface";
import Database from "./../app/services/database.service";
import { default as Middleware } from "./../app/middleware";
import { Attach } from "@dedekrnwan/decorators-express";

import { default as WelcomeController } from "./../app/controller/api/welcome.controller";

import * as hbs from "express-handlebars";
import * as path from "path";

class App {
    public app:express.Application
    constructor(){
        this.app = express()
        this.app = Middleware.before(this.app);
        this.app = Attach.Controller(this.app, [
            //array of controller
            WelcomeController
        ],'/api')
        this.app = Middleware.error(this.app);
        this.app = Middleware.after(this.app);

        this.static()
        this.view()
        this.database()
    }
    static = () => {
        this.app.use('/public',express.static(path.join(__dirname, './../public/')));
        this.app.use('/vendor',express.static(path.join(__dirname, './../vendor/')));
    }
    database = () => {
        const db = new Database();
        db.fractal();
    }
    view = () => {
        this.app.engine('hbs', hbs(
            {
                extname: '.hbs',
                defaultLayout: 'app',
                layoutsDir: path.join(__dirname, "./../app/views/layouts/"),
                partialsDir: path.join(__dirname, "./../app/views/includes/"),
                helpers: {
                    asset: (value:any):string => {
                        return `./../public/assets/${value}`;
                    },
                    public: (value:any):string => {
                        return `./../public/${value}`;
                    }
                }
            }
        ));
        this.app.set('views',path.join(__dirname, "./../app/views/pages/"))
        this.app.set('view engine','hbs')
      
    }
    run = (port:number) => {
        this.app.listen(port, () => {
            console.log(`${cServer.name} listening on the port ${port}`)
        }).on('error' , (err:Error) => {
            let another_port = [8080, 80, 3000, 4000, 5000]; 
            let next = another_port[Math.floor(Math.random() * another_port.length)];
            if(err.code == 'EADDRINUSE')
                console.error(`${cServer.name} failed listening on the port ${err['port']}`)
                console.log(`${cServer.name} try listening on the port ${next}`)
                this.run(next)

        })
    }
} 

export default App
```

## Documentation
Look at the corresponding package for instructions

[ExpressJS]:http://expressjs.com
[Reflect-Metadata]:https://www.npmjs.com/package/reflect-metadata