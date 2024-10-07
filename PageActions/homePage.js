let safeActions = require('../Utilities/safeActions')
let wait = require('../Utilities/TimeOuts')
let homePageLocators = require('../PageLocators/homePageLocators')
class HomePage {
    /**
   * Purpose - To navigate to required admin page
   */
    async navigateToHomePage() {
        await safeActions.navigate("https://acm-general-web-stg.pink.cat/tv")
    }

    async verifyHomePage(){
        let status = await safeActions.isVisibleWait(homePageLocators.HOME_PAGE_HEADER, wait.SHORT_WAIT)
        await safeActions.safeAsserts('true', status, "Home page is not opened")
    }

    async verifyHeaders(headers){
        let listOfEle = await safeActions.getElements('css selector',homePageLocators.HEADER_NAV, "All Header navigations in home page")
        for(let i=0; i<listOfEle.length; i++){
            let elementValue = await safeActions.safeGetText(listOfEle[i], wait.SHORT_WAIT, "Each element value in headers")
            await safeActions.safeAsserts('contain', elementValue, elementValue+" is not present in headers home page", headers)
        }
    }

    async verifyFooterlinks(){
        let listOfEle = await safeActions.getElements('css selector', homePageLocators.FOOTER_LINKS, "Footer links in home page")
        for(let i=0; i<listOfEle.length-1; i++){
            // await safeActions.safeVisibleClick(listOfEle[i], wait.SHORT_WAIT, "Footer link "+i+" in home page")
            let eachHref = await safeActions.getAttribute(listOfEle[i], "href", "Footer link "+i+" in home page")
            const response = await fetch(eachHref)
            await safeActions.safeAsserts('equal', response.status, eachHref+" is throwing error with status "+response.status, 200)
        }
    }
    async verifyFindOutMoreLink() {
        let status = await safeActions.isVisibleWait(homePageLocators.FIND_OUT_MORE_LINK, wait.SHORT_WAIT)
        await safeActions.safeAsserts('true', status, "Find out more link is not visible")
        let findOutMoreLink = await browser.$(homePageLocators.FIND_OUT_MORE_LINK)
        await safeActions.safeVisibleClick(findOutMoreLink, wait.SHORT_WAIT, "Find out more link")
      }
      async verifyBuyNowButton() {
        let buyNowButton = await browser.$(homePageLocators.BUY_NOW_BUTTON_TEXT_XPATH_LOCATOR)
        let status = await safeActions.isVisibleWait(buyNowButton, wait.SHORT_WAIT)
        await safeActions.safeAsserts('true', status, "Buy now button is not visible")
        await safeActions.safeVisibleClick(buyNowButton, wait.SHORT_WAIT, "Buy now button")
      }
}
module.exports = new HomePage()
