"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const index_1 = require("./app/index");
(function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
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
            let server = new index_1.IWSyncServer(config);
            yield server.start();
        }
        catch (error) {
            console.error('Cannot start app', error);
        }
    });
})();
//# sourceMappingURL=index.js.map