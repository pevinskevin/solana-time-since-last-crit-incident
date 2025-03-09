import express from 'express';
const app = express();
import path from 'path';

// app.use(express.static('public'));

import { funcMsSinceLastCritIncident } from './util/timeConverter.js';

app.get('/', async (req, res) => {
	const obj = fetchIncident();
	res.send({ data: obj });
});

app.listen(8080, () => {
	console.log('Server is running.');
});

const fetchIncident = async function () {
	const promise = await fetch(
		'https://status.solana.com/api/v2/incidents.json'
	);
	const data = await promise.json();
	const incidents = data.incidents;
	const criticalIncidentsArray = [];
	filterCriticalIncidents(incidents);

	// Filter all objects with 'impact: "critical"' to new array.
	function filterCriticalIncidents(incidents) {
		criticalIncidentsArray.push(
			...incidents.filter((incident) => incident.impact === 'critical')
		);
	}

	const timeSinceLastCritIncident = funcMsSinceLastCritIncident(
		criticalIncidentsArray[0].resolved_at
	);
	return timeSinceLastCritIncident;
};
