import {IWSyncServer} from "./app/index";

(async function start() {
    const config: any = {
        port: 3000,
        databaseConfig: [
            {
                "database": [
                    "db-redmine"
                ],
                "type": "MsSql",
                "host": "localhost",
                "port": 1433,
                "user": {
                    "username": "InfoWorld",
                    "password": ".Logimax."
                },
                "requestTimeout": 30000
            }
        ]
    };
    try {
        let server: IWSyncServer = new IWSyncServer(config);
        await server.start();
    } catch(error) {
        console.error('Cannot start app', error);
    }
})();