import * as express from "express";

interface Type extends Function {
    new (): Function;
}

export default (app:express.Express  | express.Router, controllers:Array<Type> ) => {
    controllers.forEach((controller:Function) => {
        
    })
}