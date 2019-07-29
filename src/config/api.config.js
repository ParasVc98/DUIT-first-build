/**
 * @name api.config.js
 * @type { Object }
 * @description This object contains all the config related info for this app.
 */

const config = {

    duitServerUrl: 'http://duit-django.appspot.com',
    duitOauth: {
        clientId: 'test',
        clientSecret: 'test'
    },
    locationIQApiKey: '406dab1f8f46df',
    googlePlacesKeys: 'AIzaSyAzItzd6obcmoVnimWYyxDr-nNelFxZ8Mw',
    feedbackFormLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdHJjqPKk09ZG4O9dAjzRHv9FPl_0kZYMm5JZWd4aLO0RnX8g/viewform',
    bugReportFormLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdHJjqPKk09ZG4O9dAjzRHv9FPl_0kZYMm5JZWd4aLO0RnX8g/viewform'
};

export default config;