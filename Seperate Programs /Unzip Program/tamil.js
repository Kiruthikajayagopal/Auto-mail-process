var path = require('path'), fs=require('fs'), unzip = require('unzip');
var fs = require('fs');
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
fromDir('/Users/sundht/Desktop/',/\.zip$/,function(filename){
   console.log('-- found:',filename);
   fs.createReadStream(filename).pipe(unzip.Extract({ path:  filename.slice(0, filename.lastIndexOf("/"))   })); 
fs.unlink(filename, function (err) {
 if (err) console.log(err);
});

});
