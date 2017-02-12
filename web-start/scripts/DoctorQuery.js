(function () {
    "use strict";

    var querystring = require("querystring");
    var https = require("https");

    var HttpResponseProcessor = function (parseJson, callback) {
        return function (response) {
            var responseData = "";
            response.setEncoding("utf8");
            response.on("data", function (chunk) {
                responseData += chunk;
            });
            response.on("end", function () {
                if (parseJson) responseData = JSON.parse(responseData);
                callback(null, responseData);
            });
        };
    };

    module.exports = function (apiKey, outputFormat) {
        return function (parameters, callback) {
            parameters.user_key = apiKey;
            parameters.limit = parameters.key || 100; 
            parameters.user_location = parameters.user_location || "29.766083,\ -95.358810"
            parameters['location'] = parameters['location']  || "29.766083,\ -95.358810,100"
            parameters.skip = parameters.skip || 0;
            var options = {
                hostname: "api.betterdoctor.com",
                path: "/2016-03-01/doctors?" + querystring.stringify(parameters)
            };
            var request = https.request(options, new HttpResponseProcessor(outputFormat === "json", callback));
            request.on("error", function (error) {
                callback(new Error(error));
            });
            request.end();
        };
    };

})();