const request = require('request');
const chalk = require('chalk');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYW1pcmFhbXIiLCJhIjoiY2s4bTJqMmt4MDVmajNscGNkY3dqZTByciJ9.zK1Mvo_5RiRHE1g3UTm6Qw";
    
    request ({ url, json: true }, (error, { body }) => {
        //dstucturing --> replacing the object by the used property/ies directly between { } so as to access ex: body directly instead response.body...
        //also using url directly instead url: url(the var) as they have

        if(error) {
            callback("NO CONNECTION !", undefined);
            
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search !", undefined);
        } else {
            callback(undefined, {
                 latitude : body.features[0].center[1],
                 longitude : body.features[0].center[0],
                 location : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode