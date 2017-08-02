const pd = require('pretty-data').pd;
const testFolder = './test/data/sit1_Wave2_Settlement_afx_formula/data_dictionary/CM.173';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        console.log("Formatting file %s",file);
        var unformattedText = fs.readFileSync(testFolder + '/'+file).toString();
        console.log(unformattedText);
        let formattedText=pd.xml(unformattedText);
        console.log(formattedText);

		/*let writeStream = fs.createWriteStream(testFolder+file);
		writeStream.write(pp_xml );
		writeStream.on('finish', () => {  
		  console.log('wrote all data to file');
	   }); */

    });
})