const homePage = require('../PageActions/homePage')
const acmTestData = require("../TestData/acmTestData");
describe('ACM Home page validation', async function () {
    it('ACM Home page validation', async function () {
        let testData = acmTestData.ACM
        await homePage.navigateToHomePage()
        await homePage.verifyHomePage()
        await homePage.verifyHeaders(testData.headers)
        await homePage.verifyFindOutMoreLink()
        await homePage.verifyBuyNowButton()
    })
})