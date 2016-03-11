var CONTAINER_TO_DELETE = "MyFirstContainer";

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

var deleteContainer = function (token, receivedUrl) {
  var
  https = require("https"),
  url = require("url"),
  newUrl = url.parse(receivedUrl),
  options = {
    host : newUrl.host,
    method : "DELETE",
    port : 443,
    path : newUrl.pathname + "/" + CONTAINER_TO_DELETE,
    headers : {
      "X-Auth-Token" : token
    }
  };

  console.log("deleteContainer called with: " + token);
  console.log("Url: " + receivedUrl);

  var req = https.request(options, function (res) {

      res.on("data", function (chunk) {
        console.log(chunk);
      });

      res.on("end", function () {
        console.log("All done");
      });
    });

  req.on("error", function (e) {
    console.log("error " + e);
  });

  req.end();
};

GetToken(deleteContainer);
