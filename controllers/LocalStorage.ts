function saveToLocalStorage(key: string, value: any) {
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.log(e);
		throw e;
	}
}

function loadFromLocalStorage(key:string): any {
	try {
		const serializedValue = window.localStorage.getItem(key);
		if (serializedValue === null) return undefined;
		return JSON.parse(serializedValue);
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export { saveToLocalStorage, loadFromLocalStorage };
