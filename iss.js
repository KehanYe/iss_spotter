const request = require('request');



const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null); // if there's error in api
    }
   
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Resonse: ${body}`;
      callback(Error(msg), null);
      return;
    }
   
    if (!body) {
      return callback(null, "Not a string");
    }
    
    const {ip} = JSON.parse(body);
    console.log(ip);

    return callback(null, ip);
 
  });
};

const fetchCoordsbyIp = function(ip, callback) {
  const urlGeo = `https://freegeoip.app/json/${ip}`;
  request(urlGeo, (error, response, body) => {
    if (error) {
      return callback(error, null); // if there's error in api
    }
    // console.log('this is body', body);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Resonse: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (!body) {
      return callback(null, "Not a string");
    }

    const {latitude, longitude} = JSON.parse(body);
    // console.log(latitude, longitude)

    return callback(null, {latitude, longitude});
    
  });
};

const fetchIssFlyOverTimes = (coords, callback) => {
  const urlISS = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(urlISS, (error, response, body) => {
    // console.log("this is the body", body)
    if (error) {
      return callback(error, null);
    }
    // console.log(coords.longitude)
    // if(response.statusCode !== 200) {
    //   const msg = `Status Code ${response.statusCode} when fetching IP. Resonse: ${body}`;
    //   callback(Error(msg), null);
    //   return;
    // }

    if (!body) {
      return callback(null, "Not a string");
    }

   
    let passes = JSON.parse(body);
    // console.log("testing failures", passTime)
    return callback(null, passes);

  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsbyIp(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchIssFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);

      });
  
    });

  });

};



module.exports = {nextISSTimesForMyLocation};