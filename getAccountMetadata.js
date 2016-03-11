var
cred = require("./conf/credentials.json"),
options = {
  host : cred.domainId + ".storage.oraclecloud.com",
  method : "GET",
  port : 443,
  path : "/auth/v1.0",
  headers : {
    "X-Storage-User" : "Storage-" + cred.domainId + ":" + cred.user,
    "X-Storage-Pass" : cred.pwd
  }
};

var GetToken = function (callback) {
  var
  https = require("https"),
  req = https.request(options, function (res) {

      res.on("data", function (chunk) {
        console.log(" Body GetToken: " + chunk);
      });

      res.on("end", function () {
        callback(res.headers["x-auth-token"], res.headers["x-storage-url"]);
      });
    });

  req.on("error", function (e) {
    console.log(" Gettoken error : " + e);
  });

  req.end();
};

var getAccountMetadata = function (token, receivedUrl) {
  var
  https = require("https"),
  url = require("url"),
  newUrl = url.parse(receivedUrl),
  options = {
    host : newUrl.host,
    method : "HEAD",
    port : 443,
    path : newUrl.pathname,
    headers : {
      "X-Auth-Token" : token
    }
  };

  var req = https.request(options, function (res) {
      
      res.on("data", function (chunk) {
        console.log(chunk);
      });

      res.on("end", function () {
        Object.keys(res.headers).filter(function(key,index,arr){
          if (key.substring(0,2) == "x-") {
            console.log(key + "\t : " + res.headers[key]);
          }
        });
      });
    });

  req.on("error", function (e) {
    console.log("error " + e);
  });

  req.end();
};

GetToken(getAccountMetadata);
