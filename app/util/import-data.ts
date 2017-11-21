import {insertData} from "../database/queries";
const rp = require('request-promise');
let base = 'http://192.168.101.36/redmine/issues.json';
/*
* by project: ?project_id=ID_PROJECT
* by updated date: ?updated_on=%3E%3D2014-01-02T08:12:32Z
* by project and updated date: ?project_id=ID_PROJECT&updated_on=%3E%3D2014-01-02T08:12:32Z
* */
const searchParam = process.argv[2];

export async function importData() {
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
    console.log(options.uri)

    try {
        const response = await rp(options);
        console.log('User has: ', response);
        insertData(response.issues);
    } catch (err) {
        console.log('Enable to access data: ', err);
    }
}
