interface Config{
    url:string;
    debug:boolean;
}

declare module "myPackage"{

    function init(config:Config): boolean;
    function exit(code:number): number;
}