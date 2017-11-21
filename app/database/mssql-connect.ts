const sql = require('mssql');
const sqlConnections = new Map();

export async function connectToMsSqlServer(databaseName: string, databaseConfig: any) {
    let config: MsSqlConfig = getMsSqlConfig(databaseName, databaseConfig);

    console.log(`Connecting to database ${databaseName}.`);
    try {
        let connection = await new sql.Connection(config).connect();
        console.log(`Connection to database: ${config.database} on port ${config.port} at ${config.server} opened`);
        sqlConnections.set(config.database, connection);
    } catch (err) {
        console.error(`Unable to connect to database: ${config.database} on port ${config.port} - ${err}`);
        setTimeout(() => {// wait 1 sec, retry
            connectToMsSqlServer(databaseName, databaseConfig);
        }, 1000)
    }
}

export function sqlRequest(databaseName: string): any {
    let sqlConenction = sqlConnections.get(databaseName);
    return new sql.Request(sqlConenction)
}

export interface MsSqlConfig {
    user: string,
    password: string,
    server: string, // localhost, remote address
    port: string, // port of sql server
    database: string, //name of database
    requestTimeout: number //request timeout for the database
}

function getMsSqlConfig(databaseName: string, databaseConfig: any): MsSqlConfig {
    return {
        user: databaseConfig.user.username,
        password: databaseConfig.user.password,
        server: databaseConfig.host,
        port: databaseConfig.port,
        database: databaseName,
        requestTimeout: databaseConfig.requestTimeout
    }
}