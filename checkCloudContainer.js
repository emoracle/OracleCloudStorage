var
cred = require('./conf/credentials.json');

var options = {
  host : cred.domainId + '.storage.oraclecloud.com',
  method : 'GET',
  port : 443,
  path : '/auth/v1.0',
  headers : {
    'X-Storage-User' : 'Storage-' + cred.domainId + ':' + cred.user,
    'X-Storage-Pass' : cred.pwd
  }
};

var GetToken = function (callback) {
  var
  https = require('https'),
  req = https.request(options, function (res) {

      res.on('data', function (chunk) {
        console.log(' Body GetToken: ' + chunk);
      });

      res.on('end', function () {
        callback( res.headers['x-auth-token'], res.headers['x-storage-url']);
      });
    });

  req.on('error', function (e) {
    console.log(' Gettoken error : ' + e);
  });

  req.end();
};

var containerStatus = function (token, receivedUrl) {
  var
  https = require('https'),
  url = require('url'),
  newUrl = url.parse(receivedUrl),
  options = {
    host : newUrl.host,
    method : 'GET',
    port : 443,
    path : newUrl.pathname + '/' + cred.container,
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

GetToken(containerStatus);