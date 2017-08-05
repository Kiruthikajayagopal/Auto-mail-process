const pd = require('pretty-data').pd;

var sourceFile = require('./unzip');
const fs = require('fs');
var mkdirp = require('mkdirp');

const testFolder = sourceFile.fileNamepassing + './sit1_Wave2_Settlement_afx_formula/data_dictionary/CM.173';
const formattedfolder = sourceFile.fileNamepassing + './sit1_Wave2_Settlement_afx_formula/data_dictionary/CM.173_Formatted';
console.log(testFolder);
console.log(formattedfolder);

mkdirp(sourceFile.fileNamepassing + './sit1_Wave2_Settlement_afx_formula/data_dictionary/CM.173_Formatted', function (err) {
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
})
