"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const rp = require('request-promise');
function importData() {
    return __awaiter(this, void 0, void 0, function* () {
        let options = {
            uri: 'http://192.168.101.36/redmine/issues.json',
            auth: {
                'user': 'rauls',
                'pass': '.Logimax.',
                'sendImmediately': false
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
        };
        try {
            const response = yield rp(options);
            console.log('User has: ', response);
        }
        catch (err) {
            console.log('Enable to access data: ', err);
        }
    });
}
exports.importData = importData;
//# sourceMappingURL=import-data.js.map