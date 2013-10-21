var http = require("http");
var url = require("url");

function start(route, handle){
    
	function onRequest(request, response) {
        var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " Recieved");
        // when we're uploading images we nee to pass this request to the handler
        
        route(handle, pathname, request, response);
        
        //old code - for uploading text
//        request.setEncoding("utf8");
//        request.addListener("data", function(postDataChunk) {
//                postData += postDataChunk;
//                console.log("Recieved POST Data chunk '" + 
//                            postDataChunk + "'.");
//                });
//        request.addListener("end", function() {
//                route(handle, pathname, response, postData);
//                });
        
        
        
	}

	http.createServer(onRequest).listen(1234);

	console.log("Server started");
}

exports.start = start;
