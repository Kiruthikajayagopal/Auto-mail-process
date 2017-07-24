	
var xml = '  ',
    pp_xml  = require('../pretty-data').pd.xml(xml),
    pp_xmlmin_com  = require('../pretty-data').pd.xmlmin(xml,true),
    pp_xmlmin  = require('../pretty-data').pd.xmlmin(xml);

console.log('\n==============================================================================\n');
console.log('\n/*------- Original XML string: -------*/\n\n' + xml + '\n');
console.log('\n/*------- Beautified XML -------------*/\n\n' + pp_xml  + '\n');
