"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const import_data_1 = require("./util/import-data");
const mssql_connect_1 = require("./database/mssql-connect");
const Koa = require('koa');
const cors = require('koa-cors');
const convert = require('koa-convert');
const koaBetterBody = require('koa-better-body');
class IWSyncServer {
    constructor(config) {
        console.log('Create KOA Server');
        this.app = new Koa();
        this.serverConfig = config;
        this.configMiddlewares();
        this.configRoutes();
    }
    configMiddlewares() {
        console.log('Config KOA Server');
        this.app.use(convert(koaBetterBody({
            files: true,
        })));
        this.app.use(convert(cors()));
        // this.app.use(errorHandler());
    }
    configRoutes() {
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            let databaseConfig = this.serverConfig.databaseConfig[0];
            yield mssql_connect_1.connectToMsSqlServer(databaseConfig.database[0], databaseConfig);
            yield import_data_1.importData();
            return this.app.listen(this.serverConfig.port, (error) => {
                if (error) {
                    console.log('Error while trying to open server.', error);
                    return;
                }
                console.log('Server started on port', this.serverConfig.port);
            });
        });
    }
}
exports.IWSyncServer = IWSyncServer;
//# sourceMappingURL=index.js.map