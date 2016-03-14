var CONTAINER = "WIContainer1";

var containerStatus = function (token, receivedUrl) {
  var
  https = require('https'),
  url = require('url'),
  newUrl = url.parse(receivedUrl),
  options = {
    host : newUrl.host,
    method : 'GET',
    port : 443,
    path : newUrl.pathname + '/' + CONTAINER,
    headers : {
      "X-Auth-Token" : token
    }
  };

  console.log("Containerstatus called with: " + token);
  console.log("Url: " + receivedUrl);

  var req = https.request(options, function (res) {

      console.log('Number of objects: ' + res.headers['x-container-object-count']);
      console.log('Bytes used: ' + res.headers['x-container-bytes-used']);

      res.on('data', function (chunk) {
        //console.log('Content of the container: ' + chunk);
      });

      res.on('end', function () {
        console.log('All done');
      });
    });

  req.on('error', function (e) {
    console.log('error ' + e);
  });

  req.end();
};

require('getToken')(containerStatus);
