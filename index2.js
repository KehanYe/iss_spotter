const { PassThrough } = require('stream');
const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss_promised');
const {printPassTimes} = require('./index');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body))

nextISSTimesForMyLocation()
  .then((PassTimes) => {
    printPassTimes(PassTimes);
  })
  .catch((error) => {
    console.log("It didn't work!", error);
  });
