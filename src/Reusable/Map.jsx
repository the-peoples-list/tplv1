import React from 'react';
import './map.scss';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapComponent extends React.Component {

	componentDidMount() {
	}

	centerMoved(mapProps, map) {
		// ...
	}

	render() {
		const style = {
			width: 'calc(100vw-60px)',
			height: '300px',
			margin: '0px auto',
			position: 'relative',
			maxWidth: '1200px'
		}

		const containerStyle = {
			position: 'relative',
			width: '100%',
			height: '100%'
		}

		return (
			<Map
				google={this.props.google}
				zoom={10}
				initialCenter={{
					lat: 40.650002, lng: -73.949997
				}}
				style={style}
				containerStyle={containerStyle}
				onDragend={this.centerMoved}
			>
				{this.props.data.map((item,key) => (
					<Marker
						key={key}
						title={item.eventName}
						name={item.eventName}
						position={{ lat: item.eventLocation[0], lng: item.eventLocation[1] }}
					/>
				))}
			</Map>
		)
	}

}

export default GoogleApiWrapper({
	apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API)
})(MapComponent);