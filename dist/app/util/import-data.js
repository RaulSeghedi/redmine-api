"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const queries_1 = require("../database/queries");
const rp = require('request-promise');
let base = 'http://192.168.101.36/redmine/issues.json';
/*
* by project: ?project_id=ID_PROJECT
* by updated date: ?updated_on=%3E%3D2014-01-02T08:12:32Z
* by project and updated date: ?project_id=ID_PROJECT&updated_on=%3E%3D2014-01-02T08:12:32Z
* */
const searchParam = process.argv[2];
function importData() {
    return __awaiter(this, void 0, void 0, function* () {
        let options = {
            uri: `${base}${searchParam}`,
            auth: {
                'user': 'test',
                'pass': 'Password!1',
                'sendImmediately': false
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
        };
        console.log(options.uri);
        try {
            const response = yield rp(options);
            console.log('User has: ', response);
            queries_1.insertData(response.issues);
        }
        catch (err) {
            console.log('Enable to access data: ', err);
        }
    });
}
exports.importData = importData;
//# sourceMappingURL=import-data.js.map