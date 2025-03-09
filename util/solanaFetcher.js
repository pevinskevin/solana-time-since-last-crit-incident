import { funcMsSinceLastCritIncident } from './util/timeConverter.js';

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
