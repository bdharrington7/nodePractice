var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " Recieved");
		console.log(request.url);


		//console.log(request);
		response.writeHead(200, {"Content-Type": "text/plain"});
        var cont = route(handle, pathname);
		response.write(cont);
		response.end();
		console.log("served a page");
	}

	http.createServer(onRequest).listen(1234);

	console.log("Server started");
}

exports.start = start;
