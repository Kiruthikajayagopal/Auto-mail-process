const pd = require('pretty-data').pd;

var sourceFile = require('./unzip');
console.log(sourceFile.fileNamepassing);

//const testFolder = sourceFile.fileNamepassing;
//const formattedfolder = sourceFile.fileNamepassing;
//onsole.log(testFolder);
/*console.log(formattedfolder);

const fs = require('fs');
var mkdirp = require('mkdirp');
mkdirp(sourceFile.fileNamepassing, function (err) {
    if (err) console.error(err)
});

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        console.log("Formatting file %s", file);
        var unformattedText = fs.readFileSync(testFolder + '/' + file).toString();
        // console.log(unformattedText);
        let formattedText = pd.xml(unformattedText);
        // console.log(formattedText);

        let writeStream = fs.createWriteStream(formattedfolder + '/' + file);
        writeStream.write(formattedText);
        writeStream.on('finish', () => {
            console.log('wrote all data to file');

        });

    });
})*/
