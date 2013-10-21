
var exec = require("child_process").exec;
var fs = require("fs");
var qs = require("querystring");
var formidable = require("formidable");

function start(request, response) {
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

function upload(request, response) {
    console.log("Request handler 'upload' was called.");
    
    var form = new formidable.IncomingForm();
    console.log("About to parse");
    form.parse(request, function(error, fields, files){
               console.log("parsing done");
               
               fs.rename(files.upload.path, "/tmp/test.jpg", function (err){
                                                                if (err){
                                                                fs.unlink("/tmp/test.jpg");
                                                                fs.rename(files.upload.path, "/tmp/test.jpg");
                                                                }
                        });
               response.writeHead(200, {"Content-Type" : "text/html"});
               response.write("Received Image: <br />");
               response.write("<img src='/show' />");
               response.end();
               
        });
    
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.write("You Wrote: " + qs.parse(postData).text);
//    response.end();
}

function show(request, response){
    console.log("Request handler 'show' was called");
    fs.readFile("/tmp/test.jpg", "binary", function (error, file){
        if (error){
            response.writeHead(500, {"Content-Type": "text-plain"});
            response.write(error + "\n");
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