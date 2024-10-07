# wdio-automation-framework

## Overview

This project is a web automation framework designed to perform various actions on web elements safely. It includes utilities for navigating web pages, interacting with elements, and verifying API responses.

## Project Structure

.
├── .gitignore
├── allure-Report/
├── Configurations/
│   ├── BrowserConfiguration.js
│   └── CommonConfig.js
├── FailedScreenShots/
├── package.json
├── PageActions/
│   └── homePage.js
├── PageLocators/
│   └── homePageLocators.js
├── readme.md
├── reports/
├── results/
├── runBatch.bat
├── TestData/
├── TestSuite/
└── Utilities/
    └── safeActions.js

## Key Components

### Utilities/safeActions.js

The `safeActions.js` file provides various methods to interact with web elements safely. Below are some of the key methods:

#### Navigation Methods
- `navigate(destUrl_)`: Navigate to the specified URL.
- `navigateBack()`: Navigate to the previous page.
- `navigate_mobileWeb(destUrl_)`: Navigate to the specified URL in mobile web.

#### Element Interaction Methods
- `safeVisibleClick(locator, time, friendlyNameOfElement)`: Click on a visible web element.
- `doubleClick(locator, friendlyNameOfElement)`: Double-click on a web element.
- `safeJavaScriptClick(locator, friendlyNameOfElement)`: Click on an element using JavaScript executor.
- `safeSetValue(locator, text, time, friendlyNameOfElement)`: Clear and enter value in text fields.
- `safeSetValueWithKeys(locator, text, time, friendlyNameOfElement)`: Set value with keys in text fields.
- `safeGetText(locator, time, friendlyNameOfElement)`: Get the text from a web element.
- `getAttribute(locator, attribute, friendlyNameOfElement)`: Get the value of the given element's attribute.
- `selectByText(locator, text, friendlyNameOfElement)`: Select an option from a dropdown by text.
- `selectByValue(locator_, value_, friendlyNameOfElement)`: Select an option from a combo box by value.
- `selectByIndex(locator, value_, friendlyNameOfElement)`: Select an option from a combo box by index.
- `scrollTo(locator, friendlyNameOfElement)`: Scroll to the given locator by taking x and y coordinates.

#### Utility Methods
- `safePause(timeOut, friendlyReasonForWait)`: Pause execution for a specified time.
- `isVisibleWait(locator, time, friendlyNameOfElement)`: Wait until the element is visible and return true/false.
- `waitUntilElementDisappear(locator_, timeout, friendlyNameOfElement)`: Wait until the element disappears.
- `getRandomNumber(number)`: Generate a random number.
- `frame(id, friendlyNameOfElement)`: Switch to a frame.
- `frameParent()`: Switch to the parent frame.
- `switchToWindow(id, friendlyNameOfElement)`: Switch to a specified window.
- `verifyApiResponseCode(response, expectedCode)`: Verify the API response code.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/RajaRam-Kannuri/wdio-automation-framework
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

To run the tests, use the following command:
```sh
npm test
```

##**Contributing**
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

##**License**
This project is licensed under the MIT License.
