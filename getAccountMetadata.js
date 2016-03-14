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
        Object.keys(res.headers).filter(function (key, index, arr) {
          if (key.substring(0, 2) == "x-") {
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

require('getToken')(getAccountMetadata);
