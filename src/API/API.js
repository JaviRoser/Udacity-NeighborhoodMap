class APIhelper {
	static baseURL() {
		return "https://api.foursquare.com/v2";
	}
	static ClientsKeysAuth() {
		const keys = {
			client_id: "HNTNPCMO3SME2E4BUOHTZC1UXY0JSXADCQCWSJ15G1OXOC2J",
			client_secret: "3OTBDOWLKL2INLVWYI3WHIDIB0HLLXMO4OB5TWZ1MLKXGZ04",
			v: "20181005"
		};

		return Object.keys(keys)
			.map(key => `${key}=${keys[key]}`)
			.join("&");
	}

	static urlPramsBuilder(urlPrams) {
		if (!urlPrams) {
			return "";
		}
		return Object.keys(urlPrams)
			.map(key => `${key}=${urlPrams[key]}`)
			.join("&");
	}

	static headers() {
		return {
			Accept: "application/json"
		};
	}
	static fetchData(endPoint, method, urlPrams) {
		let requestData = {
			method,
			headers: APIhelper.headers()
		};
		return fetch(
			`${APIhelper.baseURL()}${endPoint}?${APIhelper.ClientsKeysAuth()}&${APIhelper.urlPramsBuilder(
				urlPrams
			)}`,
			requestData
		).then(res => res.json());
	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return APIhelper.fetchData("/venues/explore", "GET", urlPrams);
	}
	static getBBQDetails(VENUE_ID) {
		return APIhelper.fetchData(`/venues/${VENUE_ID}`, "GET");
	}
	static getBBQPhotos(VENUE_ID) {
		return APIhelper.fetchData(`/venues/${VENUE_ID}/photos`, "GET");
	}
}
