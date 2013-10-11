
var exec = require("child_process").exec;
var fs = require("fs");

function start(response) {
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

function upload(response) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload");
    response.end();
}

exports.start = start;
exports.upload = upload;