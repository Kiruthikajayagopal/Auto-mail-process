const testFolder = './Analysis/sit1_Wave2_Settlement_afx_formula (1)/data_dictionary/CM.173/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
 files.forEach(file => {
   console.log(file);
   var array = fs.readFileSync(testFolder+file).toString().split("\n");
   console.log("\n\n\n",array);
   for(look in array)
    {
      var xml = array[look],
      pp_xml = require('./predata.js').pd.xml(xml);
    
    console.log('\n\n\n', pp_xml);

  
    }
  var writeStream = fs.createWriteStream(testFolder+file);
  writeStream.write(pp_xml );
  writeStream.on('finish', () => {  
    console.log('wrote all data to file');
  
 }); 

 });
})