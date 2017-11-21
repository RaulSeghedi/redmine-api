import * as KoaI from "koa";
import {importData} from "./util/import-data";
import {connectToMsSqlServer} from "./database/mssql-connect";

const Koa: any = require('koa');
const cors: any = require('koa-cors');
const convert: any = require('koa-convert');
const koaBetterBody = require('koa-better-body');

export class IWSyncServer {
    private app: KoaI;
    private serverConfig: any;

    constructor(config: any) {
        console.log('Create KOA Server');
        this.app = new Koa();
        this.serverConfig = config;

        this.configMiddlewares();
        this.configRoutes();
    }

    private configMiddlewares() {
        console.log('Config KOA Server');
        this.app.use(convert(koaBetterBody({
            files: true,
        })));
        this.app.use(convert(cors()));
        // this.app.use(errorHandler());
    }

    private configRoutes() {
    }

    async start() {
        let databaseConfig = this.serverConfig.databaseConfig[0];
        await connectToMsSqlServer(databaseConfig.database[0], databaseConfig);
        await importData();
        return this.app.listen(this.serverConfig.port, (error: any) => {
            if (error) {
                console.log('Error while trying to open server.', error);
                return;
            }
            console.log('Server started on port', this.serverConfig.port);
        });
    }
}