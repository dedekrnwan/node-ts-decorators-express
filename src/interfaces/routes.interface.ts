export interface IRoutes {
    path: string,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'checkout' | 'copy' | 'delete' | 'get' | 'head'
    | 'lock' | 'merge' | 'mkactivity' | 'mkcol' | 'move' | 'm-search' | 'notify' | 'options' | 'purge' | 'report' | 'search'
    | 'subscribe' | 'trace' | 'unlock' | 'unsubscribe',
    function:string
}
