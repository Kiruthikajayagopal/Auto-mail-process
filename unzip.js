var path = require('path'), fs=require('fs'), unzip = require('unzip');
var extract = require('extract-zip')
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
fromDir('/Users/kumars/Desktop/workspace/Project/mainproject/attachments/',/\.zip$/,function(filename){
   console.log('-- found:',filename);

    extract(filename, {dir: filename.slice(0, filename.lastIndexOf("/"))}, function (err)
   {
       fs.unlink(filename, function (err) {
 if (err) console.log(err);
});
 //console.log("completed..");
 //var formatter = require('./formatter.js')
})
 // fs.createReadStream(filename).pipe(unzip.Extract({ path:  filename.slice(0, filename.lastIndexOf("/"))   }));
});
},400);
clearInterval();
 var formatter = require('./formatter.js')
