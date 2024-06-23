export function getGreeting(): string {
	const now = new Date();
	const currentHour = now.getHours();

	if (currentHour < 6) {
		return "Dobrú Večer";
	} else if (currentHour < 12) {
		return "Dobré ráno";
	} else if (currentHour < 18) {
		return "Dobrý deň";
	} else {
		return "Dobrý večer";
	}
}
