const allureReporter = require('@wdio/allure-reporter').default
let fs = require('fs-extra')
const log4js = require('log4js')
const logger = log4js.getLogger('ACM')
let commonConfig = require('./CommonConfig')
exports.config = {
    afterTest: async function (
        test,
        context,
        { error, result, duration, passed, retries }
    ) {
        let testName = test.title
        const logFilePath = './reports/logs/' + testName + '.log'
        const logFile = await fs.readFileSync(logFilePath)
        await allureReporter.addAttachment('Logs', logFile, 'text/plain')
        if (passed === false) {
            await logger.log('\t', '##########FAILED##########')
            await fs.ensureDirSync('./FailedScreenShots')
            await browser.saveScreenshot(
                './FailedScreenShots/' + test.title + duration + '.png'
            )
            const file = './FailedScreenShots/' + test.title + duration + '.png'
            const data = await fs.readFileSync(file)
            await allureReporter.addAttachment('FailedScreenShot', data, 'image/png')
        }
    },
    bail: 0,
    baseUrl: process.env.baseUrl || 'http://localhost',
    beforeTest: function (test, context) {
        logger.log(test.title)
        const log4js = require('log4js')
        log4js.configure({
            appenders: {
                [test.title]: {
                    filename: 'reports/logs/' + test.title + '.log',
                    type: 'file',
                },
            },
            categories: {
                default: { appenders: [test.title], level: 'info' },
            },
        })
    },
    capabilities: [
        commonConfig.Desktop_Capabilities,
        //commonConfig.TestUserStores_Capabilities,
    ],
    connectionRetryCount: 3,
    connectionRetryTimeout: 120000,
    framework: 'mocha',
    logLevel: 'warn',
    mochaOpts: {
        timeout: 1800000,
    },
    reporters: [
        [
            'allure',
            {
                disableMochaHooks: false,
                disableWebdriverScreenshotsReporting: true,
                disableWebdriverStepsReporting: true,
                outputDir: 'reports',
            },
        ],
        [
            'junit',
            {
                outputDir: 'results',
                outputFileFormat: function (options) {
                    // optional
                    return `test-${options.cid}.xml`
                },
            },
        ],
    ],
    specFileRetries: 0,
    runner: 'local',

    screenshotPath: 'FailedScreenShots/',
    services: ['chromedriver'],

    waitforTimeout: 10000,
}