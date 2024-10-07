let path = require('path');

let Desktop_Capabilities = {
    browserName: 'chrome',
    acceptInsecureCerts: true,
    maxInstances: 6,
    specs: [
        '../TestSuite/*.js',
    ],
    //exclude: path of the spec,
    'goog:chromeOptions': {
        args: [
            //'--headless',
            '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
            '--window-size=1280,800', 'disable-infobars', 'disable-popup-blocking',
            'disable-notifications',
        ],
    },
}
exports.Desktop_Capabilities = Desktop_Capabilities