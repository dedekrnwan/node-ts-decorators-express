"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = (prefix) => {
    return (target) => {
        const metakey = {
            routes: `${target.name}:routes`,
            prefix: `${target.name}:prefix`,
        };
        Reflect.defineMetadata(metakey.prefix, prefix, target);
        prefix = Reflect.getMetadata(metakey.prefix, target);
        //routes
        if (!Reflect.hasMetadata(metakey.routes, target)) {
            Reflect.defineMetadata(metakey.routes, [], target);
        }
    };
};
