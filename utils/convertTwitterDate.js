var moment = require('moment');

var months = {
  'Jan' : '01',
  'Feb' : '02',
  'Mar' : '03',
  'Apr' : '04',
  'May' : '05',
  'Jun' : '06',
  'Jul' : '07',
  'Aug' : '08',
  'Sep' : '09',
  'Oct' : '10',
  'Nov' : '11',
  'Dec' : '12'
}

function convertTwitterDate (twitterDateString) {
  var dateStrArray = twitterDateString.split(' ');
  var yearVal = dateStrArray[dateStrArray.length - 1];
  var monthVal = dateStrArray[1];
  var dayVal = dateStrArray[2];
  var timeVal = dateStrArray[3];

  return moment(`${yearVal}-${months[monthVal]}-${dayVal} ${timeVal}`).unix();
}

module.exports = convertTwitterDate;
