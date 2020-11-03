const sensor = require("node-dht-sensor").promises;
const express = require("express");

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('humijs online');
});

app.get('/report', async (req, res) => {
	try {
    const data = await sensor.read(22, 4);
		const response = {
			temperature: data.temperature,
			humidity: data.humidity
		}
		res.status(200).json(response);
	} catch (err) {
		console.log('Error reading sensor', err);
		res.status(500).json({ error: 'Error reading sensor: ' + err });
   	}
});

app.listen(port, () => {
  	console.log(`Example app listening at http://localhost:${port}`)
})
