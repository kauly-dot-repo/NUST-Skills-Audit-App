const API_URL = (!process.env.NODE_ENV || process.env.NODE_ENV == "development" ) ? 'http://localhost:8120' : window.location.origin 


module.exports = API_URL;