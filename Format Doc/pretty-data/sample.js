const testFolder = './zip_file\ /sit1_Wave2_Settlement_afx_formula\ \(1\)/data_dictionary/CM.173/';
var fs = require('fs');

fs.readdir(testFolder, (err, files) => {
 files.forEach(file => {
   console.log(file);

   var array = fs.readFileSync(testFolder+file).toString();  
   console.log("\n\n\n",array);
 
   var xml = array,
    pp_xml  = require('../pretty-data').pd.xml(xml);

    console.log('\n/*------- Beautified XML -------------*/\n\n' + pp_xml  + '\n');
    /*
   var wstream = fs.createWriteStream(testFolder+file);
   
       wstream.on('finish', function () {
           console.log('file has been written');
       });
       wstream.write(file);
       wstream.end();*/
  });
   })
