let safeActions = require('../Utilities/safeActions')
class AshTestData {
    constructor() {
        this.ACM = {
            email: 'testauto' + safeActions.getRandomNumber(5) + '@gmail.com',
            firstName: 'Auto_FirstName',
            lastName: 'Auto_LastName',
            street: 'Automation Address',
            address: 'Automation Address',
            headers: ["Astro TV Packs",
                "Astro Fibre",
                "Products & Services",
                "TV Guide",
                "Promotions",
                "My Account",
                "Support"
            ]
        }
    }
}
module.exports = new AshTestData()
