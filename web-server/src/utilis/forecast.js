const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b7d4f09a0b230d0475b4732ecfffa9d1/' + latitude + ',' + longitude + '?units=si';

    request ({ url, json: true }, (error, { body }) => {
        //dstucturing --> replacing the object by the used property/ies directly between { } so as to access ex: body directly instead response.body...
        //also using url directly instead url: url(the var) as they have the same name

        if(error) {
            callback("NO CONNECTION !", undefined);
            
        } else if (body.error ) {
            callback("Unable to find location. Try another search !", undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + "and it is " + body.currently.temperature + " degrees with " + body.currently.precipProbability + "% chance to rain")
        }
    })
}

module.exports = forecast