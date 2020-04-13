const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b7d4f09a0b230d0475b4732ecfffa9d1/' + latitude + ',' + longitude + '?units=si';

    request ({ url, json: true }, (error, { body }) => {
        //dstucturing --> replacing the object by the used property/ies directly between { } so as to access ex: body directly instead response.body...
        //also using url directly instead url: url(the var) as they have the same name

        if(error) {
            callback("THERE IS NO CONNECTION !", undefined);
            
        } else if (body.error ) {
            callback("Unable to find this location. Try another search !", undefined);
        } else {
            console.log(body.daily.data[0]);
            callback(undefined, body.daily.data[0].summary + ". It is " + body.currently.temperature + " degrees ( high today is " + body.daily.data[0].temperatureHigh + " & low of " + body.daily.data[0].temperatureLow +"), With " + body.currently.precipProbability + "% chance to rain")
        }
    })
}

module.exports = forecast