"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
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
            Reflect.defineMetadata(metakey.routes, express.Router(), target);
        }
    };
};
