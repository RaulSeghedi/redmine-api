"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const sql = require('mssql');
const sqlConnections = new Map();
function connectToMsSqlServer(databaseName, databaseConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        let config = getMsSqlConfig(databaseName, databaseConfig);
        console.log(`Connecting to database ${databaseName}.`);
        try {
            let connection = yield new sql.Connection(config).connect();
            console.log(`Connection to database: ${config.database} on port ${config.port} at ${config.server} opened`);
            sqlConnections.set(config.database, connection);
        }
        catch (err) {
            console.error(`Unable to connect to database: ${config.database} on port ${config.port} - ${err}`);
            setTimeout(() => {
                connectToMsSqlServer(databaseName, databaseConfig);
            }, 1000);
        }
    });
}
exports.connectToMsSqlServer = connectToMsSqlServer;
function sqlRequest(databaseName) {
    let sqlConenction = sqlConnections.get(databaseName);
    return new sql.Request(sqlConenction);
}
exports.sqlRequest = sqlRequest;
function getMsSqlConfig(databaseName, databaseConfig) {
    return {
        user: databaseConfig.user.username,
        password: databaseConfig.user.password,
        server: databaseConfig.host,
        port: databaseConfig.port,
        database: databaseName,
        requestTimeout: databaseConfig.requestTimeout
    };
}
//# sourceMappingURL=mssql-connect.js.map