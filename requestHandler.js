
var exec = require("child_process").exec;
var fs = require("fs");
var qs = require("querystring");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    
    var content = "empty";
    
//    exec("find ~/Downloads",
//         { timeout: 10000, maxBuffer: 20000*1024 },
//         function (error, stdout, stderr) {
//         response.writeHead(200, {"Content-Type": "text/plain"});
//         response.write(stdout);
//         response.end();
//         });
    
    fs.readFile('./start.html', function (err, data){
                if(err) throw err;
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(data);
                response.end();
                });
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You Wrote: " + qs.parse(postData).text);
    response.end();
}

function show(response, postData){
    console.log("Request handler 'show' was called");
    fs.readFile("/tmp/test.jpg", "binary", function (error, file){
        if (error){
            response.writeHead(500, {"Content-Type": "text-plain"});
            response.write(err + "\n");
            response.end();
        }
        else {
            response.writeHead(200, {"Content-Type": "image/jpg"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;