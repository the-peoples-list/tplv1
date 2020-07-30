// @TODO Implement later - giving me trouble
import React from "react";

export default class NativeGeolocation extends React.Component {

	constructor(props)
	{
		super(props);
		this.success = this.success.bind(this);

	}

	geoFindMe = () => {

		if(!navigator.geolocation) {
			return <div>Geolocation is not supported by your browser</div>
		} else {
			navigator.geolocation.getCurrentPosition(this.success, error);
		}
		function error () {
			return <div>Unable to retrieve your location</div>;
		}
	}

	success (position) {
		this.props.getGeolocationProps(position)
	}




	render() {

		return (
			<React.Fragment>{this.geoFindMe()}</React.Fragment>
		)
	}
}

