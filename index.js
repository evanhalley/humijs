const sensor = require("node-dht-sensor").promises;
const express = require("express");

const PORT = 3000;
const SENSOR_TYPE = 22;
const PIN = 4;

const app = express();

app.get('/temperature', async (req, res) => {
	let data = await readSensor();
  
  if (data) {
    res.status(200).json({ temperature: data.temperature });
  } else {
    res.status(500);
  }
});

app.get('/humidity', async (req, res) => {
  let data = await readSensor();
  
  if (data) {
    res.status(200).json({ humidity: data.humidity });
  } else {
    res.status(500);
  }
});

async function readSensor() {
  let data = null;

  try {
    data = await sensor.read(SENSOR_TYPE, PIN);
	} catch (err) {
		console.log('Error reading sensor', err);
  }
  return data;
}

app.listen(PORT, () => {
  	console.log(`HumiJS is online @ http://localhost:${PORT}`)
});
