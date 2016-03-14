var NEWCONTAINER = "MyFirstContainer";

var createContainer = function (token, receivedUrl) {
  var
  https = require("https"),
  url = require("url"),
  newUrl = url.parse(receivedUrl),
  options = {
    host : newUrl.host,
    method : "PUT",
    port : 443,
    path : newUrl.pathname + "/" + NEWCONTAINER,
    headers : {
      "X-Auth-Token" : token
    }
  };

  console.log("createContainer called with: " + token);
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

require('getToken')(createContainer);
