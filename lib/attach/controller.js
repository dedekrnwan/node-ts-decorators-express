"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
exports.default = (app, controllers, uses = '') => {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield controllers.forEach((controller) => __awaiter(this, void 0, void 0, function* () {
                let metakey = {
                    routes: `${controller.name}:routes`,
                    prefix: `${controller.name}:prefix`,
                    middlewares: `${controller.name}:middlewares`,
                };
                const instance = yield new controller();
                const prefix = yield Reflect.getMetadata(metakey.prefix, controller);
                const routes = yield Reflect.getMetadata(metakey.routes, controller);
                const router = yield express.Router();
                routes.forEach((route) => __awaiter(this, void 0, void 0, function* () {
                    let middlewares = (yield Reflect.getMetadata(metakey.middlewares, controller, route.function)) || {
                        before: [],
                        after: [],
                        error: []
                    };
                    let handler = yield instance[route.function];
                    yield router.route(`${route.path}`)[route.method]([...middlewares.before, handler, ...middlewares.after, ...middlewares.error]);
                    yield app.use(`${uses}${prefix}`, router);
                }));
            }));
            resolve(app);
        }
        catch (error) {
            reject(error);
        }
    }));
};
