class HomePageLocators {
    // Header
//Header Locators

HOME_PAGE_TITLE = "//header[@class='login-header']/img[@title='Adobe Commerce Admin Panel']"

HOME_PAGE_HEADER = "#acm-header"

HEADER_NAV = "#acm-header__global-nav nav div span"
FOOTER_LINKS = "#acm-footer__top-section .leading-6 a"

SEARCH_RESULT_CONTAINER = "//div[@class='search-result-container']"

SEARCH_SUGGESTIONS = "//ul[@class='search-suggestions']"

HEADER_BACKGROUND_IMAGE = "//div[@class='header-background-image']"

HEADER_GRADIENT_OVERLAY = "//div[@class='header-gradient-overlay']"

HEADER_TOP_SECTION = "//div[@class='header-top-section']"

HEADER_BOTTOM_SECTION = "//div[@class='header-bottom-section']"

HEADER_MENU_TOGGLE = "//button[@class='header-menu-toggle']"

HEADER_MENU_TOGGLE_ICON = "//i[@class='header-menu-toggle-icon']"

HEADER_LANGUAGE_SWITCHER = "//select[@class='header-language-switcher']"

HEADER_CURRENCY_SWITCHER = "//select[@class='header-currency-switcher']"

HEADER_ACCOUNT_DROPDOWN_MENU = "//ul[@class='header-account-dropdown-menu']"

HEADER_ACCOUNT_DROPDOWN_LINKS = "//ul[@class='header-account-dropdown-links']//li"

HEADER_NOTIFICATIONS = "//div[@class='header-notifications']"

HEADER_NOTIFICATIONS_COUNT = "//span[@class='header-notifications-count']"

HEADER_FAVORITES = "//div[@class='header-favorites']"

//Footer Locators

HOME_PAGE_FOOTER = "//footer[@class='page-footer']"

FOOTER_TOP_SECTION = "//div[@class='footer-top-section']"

FOOTER_MIDDLE_SECTION = "//div[@class='footer-middle-section']"

FOOTER_BOTTOM_SECTION = "//div[@class='footer-bottom-section']"

FOOTER_COPYRIGHT_TEXT = "//p[@class='footer-copyright-text']"

FOOTER_SOCIAL_MEDIA_LINKS = "//ul[@class='footer-social-media-links']//li"

FOOTER_CONTACT_INFORMATION = "//address[@class='footer-contact-info']"

FOOTER_TERMS_AND_CONDITIONS_LINK = "//a[@href='/terms-and-conditions']"

FOOTER_PRIVACY_POLICY_LINK = "//a[@href='/privacy-policy']"

FOOTER_FAQ_LINK = "//a[@href='/faq']"

FOOTER_CUSTOMER_SUPPORT_LINK = "//a[@href='/customer-support']"

FOOTER_DOWNLOAD_APP_LINK = "//a[@href='/download-app']"

FOOTER_ASTRO_GO_LINK = "//a[@href='/astro-go']"

FOOTER_NEWSLETTER_SIGNUP_FORM = "//form[@class='footer-newsletter-signup-form']"

FOOTER_NEWSLETTER_SIGNUP_INPUT = "//input[@class='footer-newsletter-signup-input']"

FOOTER_NEWSLETTER_SIGNUP_BUTTON = "//button[@class='footer-newsletter-signup-button']"

FOOTER_PAYMENT_METHODS = "//ul[@class='footer-payment-methods']"

FOOTER_PAYMENT_METHOD_ICONS = "//ul[@class='footer-payment-method-icons']//li"

FOOTER_PAYMENT_METHOD_LINKS = "//ul[@class='footer-payment-method-links']//li"

FOOTER_SUPPORT_LINKS = "//ul[@class='footer-support-links']//li"

FOOTER_SUPPORT_ICON = "//i[@class='footer-support-icon']"

ONLINE_EXCLUSIVE_HEADER = "//p[text()='Online Exclusive: Sports + Movies Pack at RM109.99/mth']"
FIND_OUT_MORE_BUTTON = "//button[text()='Find out more']"
ONLINE_EXCLUSIVE_PRICE = "//p[text()='RM109.99/mth']"
FIND_OUT_MORE_LINK = "//a[text()='Find out more']"
ONLINE_EXCLUSIVE_PACK = "//p[text()='Sports + Movies Pack']"
RM10999_PRICE = "//p[text()='RM109.99/mth']"
MONTHLY_PRICE = "//p[text()='mth']"
BUY_NOW_BUTTON_TEXT_XPATH_LOCATOR = "//button[normalize-space(text())='Buy now']"

}
module.exports = new HomePageLocators()

