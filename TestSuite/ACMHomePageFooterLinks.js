const homePage = require('../PageActions/homePage')
const acmTestData = require("../TestData/acmTestData");
describe('ACM Home page Footer Links', async function () {
    it('ACM Home page Footer Link', async function () {
        let testData = acmTestData.ACM
        await homePage.navigateToHomePage()
        await homePage.verifyHomePage()
        await homePage.verifyFooterlinks()
    })
})

