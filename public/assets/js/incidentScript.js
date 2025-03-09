'use strict';

let timeSinceIncident;
let timeUnits = {};

document.addEventListener('DOMContentLoaded', async () => {
	timeSinceIncident = await timeSinceLastCritIncident();
	timeUnits = funcMsToDaysHoursMinutesSeconds(timeSinceIncident);
	updateDOMWithTimeUnits(timeUnits);
	setInterval(updateTimeEverySecond, 1000);
});

const timeSinceLastCritIncident = async function () {
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

function funcMsSinceLastCritIncident(lastIncident) {
	// Get's milliseconds passed since Jan. 1, 1970 UTC.
	let currentTime = Date.now();

	// Parses Date string into milliseconds passed since Jan. 1, 1970 UTC.
	let lastCriticalIncident = Date.parse(lastIncident);

	// Calculates time (in ms) since last critical incident.
	let deltaLastCriticalIncident = currentTime - lastCriticalIncident;

	return deltaLastCriticalIncident;
}

// Converts ms to DD:HH:MM:SS.
const funcMsToDaysHoursMinutesSeconds = function (ms) {
	let days = Math.floor(ms / 1000 / 60 / 60 / 24);
	ms %= 24 * 60 * 60 * 1000;

	let hours = Math.floor(ms / 1000 / 60 / 60);
	ms %= 60 * 60 * 1000;

	let minutes = Math.floor(ms / 1000 / 60);
	ms %= 1000 * 60;

	let seconds = Math.floor(ms / 1000);

	return { days, hours, minutes, seconds };
};

// Increments time for each passing second, rather than doing redundant API calls.
function updateTimeEverySecond() {
	timeSinceIncident += 1000;
	timeUnits = funcMsToDaysHoursMinutesSeconds(timeSinceIncident);
	updateDOMWithTimeUnits(timeUnits);
}

function updateDOMWithTimeUnits({ days, hours, minutes, seconds }) {
	document.getElementById('output').innerHTML = `
		<div>
			<span class="time-value">${days}</span>
			<span class="time-label">days</span>
		</div>
		<div>
			<span class="time-value">${hours}</span>
			<span class="time-label">hours</span>
		</div>
		<div>
			<span class="time-value">${minutes}</span>
			<span class="time-label">minutes</span>
		</div>
		<div>
			<span class="time-value">${seconds}</span>
			<span class="time-label">seconds</span>
		</div>
		<div class="time-description">since last critical incident</div>
	`;
}
