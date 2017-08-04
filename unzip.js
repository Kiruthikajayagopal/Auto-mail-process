var path = require('path'), fs=require('fs'), unzip = require('unzip');
var fs = require('fs');

setInterval(function(){
function fromDir(startPath,filter,callback){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }
   
    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter,callback);
        }
        else if (filter.test(filename)) callback(filename);
    };

 };
fromDir('/Users/kumars/Desktop/attachments',/\.zip$/,function(filename){
   //console.log('-- found:',filename.substring(0, filename.length - 4));
  //fs.createReadStream(filename).pipe(unzip.Extract({ path:  filename.slice(0, filename.lastIndexOf("/"))   }));
  module.exports.fileNamepassing = filename.substring(0, filename.length - 4);

fs.unlink(filename, function (err) {
 if (err) console.log(err);
});

});
},400);

 var formatter = require('./formatter.js');
/*do
{
    function
    {
    if filename==nothing
    a=0
    else
    a=1
    }
}
while
// declare your variable for the setInterval so that you can clear it later
var myInterval; 

// set your interval
myInterval = setInterval(whichFunction,4000);

whichFunction{
    // function code goes here
}

// this code clears your interval (myInterval)
window.clearInterval(myInterval); 
*/