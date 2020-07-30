class ApiService {


	getAddress = params => {
		return this.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=`, params).then(data => data);
	}

	getCoords = params => {
		return this.get(`https://maps.googleapis.com/maps/api/geocode/json?address=`, params).then(data => data);
	}

	get(url, data) {
		return this.makeRequest('GET', url, data);
	}

	makeRequest = (type, url, data = null) => {

		return fetch(url + data + '&key=' + process.env.REACT_APP_GOOGLE_MAPS_API).then(
			response => response.json()
		).catch(function(err) {
			console.warn('something went wrong', err);
		})

	}
}

export default new ApiService();