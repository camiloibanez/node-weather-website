const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ce4ca366da03589ba710d811490676ac&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = body.current
            let description = data.weather_descriptions[0]
            let {temperature, feelslike} = data

            callback(undefined, description + ". It is currently " + temperature + " degrees out. It feels like " + feelslike + " degrees out.")
        }
    })
}

module.exports = forecast