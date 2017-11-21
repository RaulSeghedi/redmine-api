const rp = require('request-promise');

export async function importData() {

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
        const response = await rp(options);
        console.log('User has: ', response);
    } catch (err) {
        console.log('Enable to access data: ', err);
    }
}
