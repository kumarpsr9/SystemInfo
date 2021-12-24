const request = require('request');
const si = require('systeminformation');
const util = require('util')


// request('http://ip-api.com/json', { json: true }, (err, res)=> {
//   if (err) { return console.log(err); }
//   console.log(res.body);

// });

console.log("Please wait gathering system information.....");

si.getAllData((cb)=>{

    mac=cb.net.filter(e=>e.iface=='Ethernet')[0].mac;
  

    let obj={
      "itinfraitemuniqno": mac,
      "itinfraitemserialno": cb.system.serial,
      "itinfraitemmodelno": cb.system.model,
      "itinfraitemsimplespec": { "cpu":  cb.cpu, "baseboard":  cb.baseboard, "disk":  cb.diskLayout ,"mem": cb.memLayout ,"net": cb.net},
      "itinfraitemdetailedspec": cb,
     
    }
   
    request.post('https://apis.aditya.ac.in/itinfra/ItInfraItemDetails', {
  json: obj
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  //console.log(`statusCode: ${res.statusCode}`)
  console.log("This System configuration uploaded successfully!")
  console.log({"uno": body.itinfraitemdetailsid,"mac":mac});

  console.log('Press any key to exit');

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
})

})