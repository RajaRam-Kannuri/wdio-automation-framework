const log4js = require('log4js')
log4js.configure({
    appenders: {
        Application: { filename: 'reports/logs/Log4j.log', type: 'file' },
        console: { type: 'console' },
    },
    categories: {
        default: { appenders: ['Application', 'console'], level: 'trace' },
    },
})
