// const {fetchMyIP} = require('./iss');
// const{fetchCoordsbyIp} = require('./iss')
// const{fetchIssFlyOverTimes} = require('./iss')

const {nextISSTimesForMyLocation} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsbyIp('198.245.113.67', (error, coordinates) => {
//     if (error) {
//     console.log("It didn't work!" , error);
//     return;
//     }

//   console.log("It worked, we're all gonna make it. Returned coordinates:", coordinates)
  
// });



// let myCoordinates = {latitude: "52.157", longitude: "-106.5614"};

// fetchIssFlyOverTimes(myCoordinates, (error, passTime) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//     }

//   console.log("It worked, to infinity and beyond:", passTime)

// })

nextISSTimesForMyLocation((error, passTime) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log("It worked, to infinity and beyond:", passTime);
  
});