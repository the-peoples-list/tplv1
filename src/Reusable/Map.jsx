import React from 'react';
import './map.scss';
import useScript from "./Scripts";

function Map() {

	useScript("https://maps.googleapis.com/maps/api/js?key=%REACT_APP_GOOGLE_MAPS_API%&callback=initMap")

	return (
		<div id="map"></div>
	)
}

export default Map;