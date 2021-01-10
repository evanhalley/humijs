const sensor = require("node-dht-sensor").promises;
const express = require("express");

const PORT = 3000;
const SENSOR_TYPE = 22;
const PIN = 4;

const app = express();

if (process.argv.length > 2 && process.argv[2] == 'test') {
  sensor.initialize({
    test: {
      fake: {
        temperature: 21,
        humidity: 60
      }
    }
  });
}

app.get('/temperature', async (req, res) => {
	let data = await readSensor();
  
  if (data) {
    let temperature = data.temperature;
    let unit = 'c';

    if (req.query.unit) {
      unit = req.query.unit.toLowerCase();
    }

    if (unit == 'f') {
      temperature = convertToFahrenheit(temperature);
    }
    res.status(200).json({ temperature: temperature });
  } else {
    res.status(500).send();
  }
});

app.get('/humidity', async (req, res) => {
  let data = await readSensor();
  
  if (data) {
    res.status(200).json({ humidity: data.humidity });
  } else {
    res.status(500).send();
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

function convertToFahrenheit(temperatureInCelsius) {
  return (temperatureInCelsius * 9/5) + 32;
}

app.listen(PORT, () => {
  	console.log(`HumiJS is online @ http://localhost:${PORT}`)
});
