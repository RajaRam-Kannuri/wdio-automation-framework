const log4js = require('log4js')
const assert = require('assert')
const logger = log4js.getLogger('ACM')
const expect = require('chai').expect
let randomstring = require('randomstring')
const { expect: expectChai } = require('chai')
const {Key} = require("webdriverio");
class SafeActions {
    /**
   * Purpose - To navigate to required url
   * @param destUrl_
   * @returns {SafeActions}
   */
    async navigate(destUrl_) {
        try {
            if (browser.isMobile == false) {
                await browser.maximizeWindow()
            }
            await browser.url(destUrl_)
            await logger.info('Navigated to ' + destUrl_)
            return this
        } catch (e) {
            if (e.name !== null) {
                await logger.error(destUrl_ + ' is not valid - ' + e)
                await assert.fail("Failed to navigate to '" + destUrl_ + "'\n" + e)
            }
        }
    }

    /**
     * Purpose - To navigate to back page
     * @returns {Promise<void>}
     */
    async navigateBack(){
        await browser.back()
    }

    /**
   * Purpose - To navigate to required url in mobile web
   * @param destUrl_
   * @returns {SafeActions}
   */
    async navigate_mobileWeb(destUrl_) {
        try {
            //await browser.setWindowSize(375, 667)
            await browser.url(destUrl_)
            await logger.info('Navigated to ' + destUrl_)
            return this
        } catch (e) {
            if (e.name !== null) {
                await logger.error(destUrl_ + ' is not valid - ' + e)
                await assert.fail("Failed to navigate to '" + destUrl_ + "'\n" + e)
            }
        }
    }

    /**
   * Gets current page title
   */
    async getTitle() {
        try {
            //await this.domStatus()
            let title = await browser.getTitle()
            await logger.info('Page title is ' + title)
            return title
        } catch (e) {
            if (e.name !== null) {
                await logger.error('Failed to fetch page title - ' + e)
                await assert.fail('Failed to fetch page title \n' + e)
            }
        }
    }

    /**
   * Purpose - Assertions
   * @param verification
   * @param actual
   * @param friendlyText
   * @param expected
   */
    async safeAsserts(verification, actual, friendlyText, expected) {
        switch (verification) {
        case 'equal':
            await expect(expected, friendlyText).to.equal(actual)
            break
        case 'contains':
            await expect(actual, friendlyText).to.contains(expected)
            break
        case 'true':
            await expect(actual, friendlyText).to.be.true
            break
        case 'false':
            await expect(actual, friendlyText).to.be.false
            break
        case 'deepEqual':
            await expect(actual, friendlyText).to.deep.equal(expected)
            break
        case 'notInclude':
            await expect(actual, friendlyText).to.not.include(expected)
            break
        }
    }

    /**
   * Purpose - To update the dynamic text in locator
   * @param locator
   * @param updatedText
   * @returns {*}
   */
    async dynamicLocator(locator, updatedText) {
        let updatedLocator = await locator.replace('%s', updatedText)
        return updatedLocator
    }

    /**
   * Purpose - To click on the web element
   * @param locator
   * @param time
   * @param friendlyNameOfElement
   * @returns {commonSafeActions}
   */
    async safeVisibleClick(locator, time, friendlyNameOfElement) {
        try {
            const ele = $(locator)
            await this.isVisibleWait(locator, time, friendlyNameOfElement)
            await ele.click()
            await logger.info('Clicked on ' + friendlyNameOfElement)
            return this
        } catch (e) {
            if (e.name !== null) {
                await logger.error(friendlyNameOfElement + ' was not found - ' + e)
                await assert.fail(
                    "Failed to click '" + friendlyNameOfElement + "'\n" + e
                )
            }
        }
    }

    async doubleClick(locator, friendlyNameOfElement) {
        const ele = $(locator)
        await logger.info('Clicking on the element - ' + friendlyNameOfElement)
        await ele.doubleClick()
        await logger.info('Clicked on the locator - ' + friendlyNameOfElement)
        return this
    }

    /**
   * Purpose - Clicks on the element using JavaScript executor
   * @param locator
   * @param friendlyNameOfElement
   */
    async safeJavaScriptClick(locator, friendlyNameOfElement) {
        try {
            const ele = await $(locator)
            await logger.info('Clicking on the element ' + friendlyNameOfElement)
            await browser.execute('arguments[0].click();', ele)
            await logger.info('Clicked on the element ' + friendlyNameOfElement)
        } catch (e) {
            if (e.name !== null) {
                await logger.error(friendlyNameOfElement + ' was not found - ' + e)
                await assert.fail(
                    "Failed to click '" + friendlyNameOfElement + "'\n" + e
                )
            }
        }
    }

    /**
   * Purpose - To clear and enter value in text fields
   * @param locator
   * @param text
   * @param time
   * @param friendlyNameOfElement
   * @returns {Promise<void>}
   */
    async safeSetValue(locator, text, time, friendlyNameOfElement) {
        try {
            const ele = $(locator)
            await this.isVisibleWait(locator, time, friendlyNameOfElement)
            await ele.clearValue()
            await ele.setValue(text)
            await logger.info(
                'Entered text in ' + friendlyNameOfElement + ' as ' + text
            )
        } catch (e) {
            if (e.name !== null) {
                await logger.error(friendlyNameOfElement + ' was not found - ' + e)
                await assert.fail(
                    "Failed to enter text in '" + friendlyNameOfElement + "' \n " + e
                )
            }
        }
    }

    async safeSetValueWithKeys(locator, text, time, friendlyNameOfElement) {
        try {
            const ele = $(locator)
            await this.isVisibleWait(locator, time, friendlyNameOfElement)
            await ele.clearValue()
            await ele.click()
            await browser.pause(900)
            await browser.keys(text)
            await browser.pause(900)
            await browser.keys(Key.Tab)
            await logger.info(
                'Entered text in ' + friendlyNameOfElement + ' as ' + text
            )
        } catch (e) {
            if (e.name !== null) {
                await logger.error(friendlyNameOfElement + ' was not found - ' + e)
                await assert.fail(
                    "Failed to enter text in '" + friendlyNameOfElement + "' \n " + e
                )
            }
        }
    }

    async safePause(timeOut, friendlyReasonForWait) {
        await browser.pause(timeOut)
        await logger.info(
            'Static wait for ' + timeOut + 'ms ' + friendlyReasonForWait
        )
    }

    /**
   * Purpose - To wait until the element is visible and return true / false
   * @param locator
   * @param time in milliseconds
   * @param friendlyNameOfElement
   * @returns {boolean}
   */
    async isVisibleWait(locator, time, friendlyNameOfElement) {
        try {
            let isVisible = false
            const elem = $(locator)
            let i = 0
            await logger.info(
                "Waiting until element '" + friendlyNameOfElement + "' is visible"
            )
            while (i <= time) {
                isVisible = await elem.isDisplayed()
                if (isVisible) {
                    await logger.info(
                        "'" + friendlyNameOfElement + "' is displayed after " + i
                    )
                    break
                } else {
                    await browser.pause(500)
                    i = i + 500
                }
            }
            return isVisible
        } catch (e) {
            if (e.name !== null) {
                await logger.error(friendlyNameOfElement + ' is not displayed - ' + e)
            }
        }
    }

    /**
   * @param locator
   * @param friendlyNameOfElement
   * @returns {WebDriver}
   * Scrolls to given locator by taking x and y coordinates
   */
    async scrollTo(locator, friendlyNameOfElement) {
        try {
            await $(locator).scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            })
            await logger.info('scrolled ' + friendlyNameOfElement + ' into view')
        } catch (e) {
            if (e.name !== null) {
                await logger.error(
                    'Failed to scroll ' + friendlyNameOfElement + ' into view - ' + e
                )
                await assert.fail(
                    'Failed to scroll ' + friendlyNameOfElement + ' into view \n' + e
                )
            }
        }
    }

    /**
   * Purpose - To get the text from web element
   * @param locator
   * @param time
   * @param friendlyNameOfElement
   * @returns {*|jQuery|Promise<string>}
   */
    async safeGetText(locator, time, friendlyNameOfElement) {
        try {
            await this.isVisibleWait(locator, time, friendlyNameOfElement)
            let text = await $(locator).getText()
            await logger.info(
                'Fetching text- ' + text + ' for Element ' + friendlyNameOfElement
            )
            if (!text) {
                text = ''
            }
            await logger.info(
                'Fetched text with scroll of - ' +
          friendlyNameOfElement +
          ' as - ' +
          text
            )
            return text
        } catch (e) {
            if (e.name !== null) {
                await logger.error(
                    'Failed to fetch text with scroll of - ' +
            friendlyNameOfElement +
            ' in ' +
            time +
            'ms'
                )
                await assert.fail(
                    'Failed to fetch text with scroll of - ' +
            friendlyNameOfElement +
            ' in ' +
            time +
            'ms'
                )
            }
        }
    }

    /**
   * Purpose - Gets elements from a locator and returns an array of WebElement JSON objects
   * @param locatorType
   * @param locator
   * @param friendlyNameOfElement
   * @returns
   */
    async getElements(locatorType, locator, friendlyNameOfElement) {
        try {
            let elementsArray = await browser.findElements(locatorType, locator)
            await logger.info(
                'Elements in ' +
          friendlyNameOfElement +
          ' are - ' +
          elementsArray.length
            )
            return elementsArray
        } catch (e) {
            if (e.name !== null) {
                await logger.error(friendlyNameOfElement + ' was not found - ' + e)
                await assert.fail(
                    "'" + friendlyNameOfElement + "' was not found \n" + e
                )
            }
        }
    }

    /**
   * Gets value of the given element's attribute
   */
    async getAttribute(locator, attribute, friendlyNameOfElement) {
        try {
            const form = $(locator)
            const attr = await form.getAttribute(attribute)
            await logger.info(
                'Fetched attribute of ' + friendlyNameOfElement + ' ' + attr
            )
            return attr.trim()
        } catch (e) {
            if (e.name !== null) {
                await logger.error(
                    'Failed to fetch attribute of ' + friendlyNameOfElement + ' - ' + e
                )
                await assert.fail(
                    'Failed to fetch attribute of ' + friendlyNameOfElement + '\n' + e
                )
            }
        }
    }

    /**
   * Purpose - Select an option from dropdown with text
   * @param locator
   * @param text
   * @param friendlyNameOfElement
   * @returns {SafeActions}
   */
    async selectByText(locator, text, friendlyNameOfElement) {
        await this.isVisibleWait(locator, 5000, friendlyNameOfElement)
        try {
            if (text) {
                await $(locator).selectByVisibleText(text)
                await logger.info(
                    'selected ' + text + ' by text for ' + friendlyNameOfElement
                )
            }
            return this
        } catch (e) {
            if (e.name !== null) {
                await logger.error(friendlyNameOfElement + ' was not found - ' + e)
                await assert.fail(
                    "Failed to select value for '" + friendlyNameOfElement + "'\n" + e
                )
            }
        }
    }

    /**
   * Purpose - Selects an option from a combo box
   * @param locator_
   * @param value_
   * @param friendlyNameOfElement
   * @returns {commonSafeActions}
   */
    async selectByValue(locator_, value_, friendlyNameOfElement) {
        //await this.domStatus()
        try {
            if (value_) {
                await $(locator_).selectByAttribute('value', value_)
                await logger.info('selected' + value_ + ' for ' + friendlyNameOfElement)
            }
            return this
        } catch (e) {
            if (e.name !== null) {
                await logger.error(friendlyNameOfElement + ' was not found - ' + e)
                await assert.fail(
                    "Failed to select value for '" + friendlyNameOfElement + "' \n" + e
                )
            }
        }
    }

    /**
   * Purpose - Selects an option from a combo box
   * @param locator
   * @param value_
   * @param friendlyNameOfElement
   * @returns {commonSafeActions}
   */
    async selectByIndex(locator, value_, friendlyNameOfElement) {
        //await this.domStatus()
        try {
            await $(locator).selectByIndex(value_)
            await logger.info('selected ' + value_ + ' for ' + friendlyNameOfElement)
            return this
        } catch (e) {
            if (e.name !== null) {
                await logger.error(friendlyNameOfElement + ' was not found - ' + e)
                await assert.fail(
                    "Failed to select value for '" + friendlyNameOfElement + "'\n" + e
                )
            }
        }
    }

    async domStatus() {
        await browser.waitUntil(
            async function () {
                const state = await browser.execute(async function () {
                    return document.readyState
                })
                return state === 'complete'
            },
            {
                timeout: 180000,
                timeoutMsg: 'Page is not completely loaded in 180 seconds',
            }
        )
    }

    /**
   * Purpose - Generates Random Number
   * @param number
   * @returns {*}
   */
    getRandomNumber(number) {
        let randomData = randomstring.generate({
            charset: 'numeric',
            length: number,
        })
        return randomData
    }

    /**
   * Purpose - Switch to frame
   * @param id
   * @param friendlyNameOfElement
   * @returns {SafeActions}
   */
    async frame(id, friendlyNameOfElement) {
        //await this.domStatus()
        try {
            if (typeof id == 'number') {
                await browser.switchToFrame(id)
                await logger.info(
                    'Switched to frame (using index)- ' + friendlyNameOfElement
                )
            } else if (id.includes('//')) {
                let frameElementId = await browser.$(id)
                await browser.switchToFrame(frameElementId)
                await logger.info(
                    'Switched to frame (using xpath)- ' + friendlyNameOfElement
                )
            } else {
                let frameElementId = await browser.$("//iframe[@id='" + id + "']")
                await browser.switchToFrame(frameElementId)
                await logger.info(
                    'Switched to frame (using xpath id) - ' + friendlyNameOfElement
                )
            }
            await logger.info('Switched to frame - ' + friendlyNameOfElement)
            return this
        } catch (e) {
            if (e.name !== null) {
                await logger.error(
                    "Failed to switch to frame '" + friendlyNameOfElement + "' - " + e
                )
                await assert.fail(
                    "Failed to switch to frame '" + friendlyNameOfElement + "' \n" + e
                )
            }
        }
    }

    /**
   * Purpose - Switch to parent frame
   * @returns {SafeActions}
   */
    async frameParent() {
        try {
            if (browser.isMobile == true) {
                await browser.switchToFrame(null)
                await logger.info('Switched to parent frame')
                return this
            }
            await browser.switchToParentFrame()
            await logger.info('Switched to parent frame')
            return this
        } catch (e) {
            if (e.name !== null) {
                await logger.error('Failed to switch to parent frame - ' + e)
                await assert.fail('Failed to switch to parent frame \n' + e)
            }
        }
    }

    switchToWindow(id, friendlyNameOfElement) {
        try {
            this.safePause(5000, "for new window to load");
            browser.switchWindow(id);
            logger.info("Switched focus to window " + friendlyNameOfElement);
            return this;
        } catch (e) {
            if (e.name !== null) {
                logger.error("Failed to switch focus to window " + friendlyNameOfElement + "-" + e);
                assert.fail("Failed to switch focus to window " + friendlyNameOfElement + "\n" + e);
            }
        }
    }

    /**
   * Purpose - To verify the API response code
   * @param response
   * @param expectedCode
   * @returns {Promise<void>}
   */
    async verifyApiResponseCode(response, expectedCode) {
        await expect(response).to.have.status(expectedCode)
    }

    /**
     * Purpose - Wait until the element is disappeared
     * @param locator_
     * @param timeout
     * @param friendlyNameOfElement
     * @returns {Promise<void>}
     */
    async waitUntilElementDisappear(locator_, timeout, friendlyNameOfElement) {
        let time_ = 0;
        await logger.info("Waiting until " + friendlyNameOfElement + " is invisible");
        while (await this.isVisibleWait(locator_,1, friendlyNameOfElement)) {
            await this.safePause(500,"");
            time_ = time_ + 500;
            if (time_ > timeout) {
                await assert.fail(friendlyNameOfElement+' is not disappears in given timeout '+timeout)
            }
        }
        await logger.info(friendlyNameOfElement + " is disappeared after " + time_ + "ms");
    }
}

module.exports = new SafeActions()
