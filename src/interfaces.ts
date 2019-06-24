interface IMiddlewares {
    before?:Array<any>,
    after?:Array<any>,
    error?:Array<any>,
}
interface IRoutes {
    path: string,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    function?:string
}

export {
    IMiddlewares,
    IRoutes
}