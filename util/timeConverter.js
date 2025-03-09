export function funcMsSinceLastCritIncident(lastIncident) {
	// Get's milliseconds passed since Jan. 1, 1970 UTC.
	let currentTime = Date.now();

	// Parses Date string into milliseconds passed since Jan. 1, 1970 UTC.
	let lastCriticalIncident = Date.parse(lastIncident);

	// Calculates time (in ms) since last critical incident.
	let deltaLastCriticalIncident = currentTime - lastCriticalIncident;

	return funcMsToDaysHoursMinutesSeconds(deltaLastCriticalIncident);
};

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
