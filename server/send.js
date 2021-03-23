const { Client } = require('node-osc');

const client = new Client('0.0.0.0', 5000);

let timerId  = setInterval(() => {
  datasetA = Math.random() * 1000
  datasetB = Math.random() * 1000
  client.send('datasetA', datasetA, () => {
  });
  client.send('datasetB', datasetB, () => {
  });  
},100)
