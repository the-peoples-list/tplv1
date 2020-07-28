import React from 'react';
import './map.scss';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

class MapComponent extends React.Component {

	/**
	 *  Constructor for PrimaryView component class.
	 *
	 *  @param {object} props The props that get passed
	 */
	constructor(props)
	{
		super(props);

		this.state = {
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {},
		};
	}

	componentDidMount() {
	}

	centerMoved(mapProps, map) {
		// ...
	}

	onMapClicked = (props) => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			})
		}
	};

	onMarkerClick = (props, marker, e) =>
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});

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
				onClick={this.onMapClicked}
				name={'Current location'}
			>
				{this.props.data.map((item,key) => (
						<Marker
							key={'marker' + key}
							title={item.eventName}
							name={item.eventName}
							position={{ lat: item.eventLocation[0], lng: item.eventLocation[1] }}
							onClick={this.onMarkerClick}
						/>
				))}
				<InfoWindow
					marker={this.state.activeMarker}
					visible={this.state.showingInfoWindow}
				>
					<div>
						<div>{this.state.activeMarker.name}</div>
					</div>
				</InfoWindow>
			</Map>
		)
	}

}

export default GoogleApiWrapper({
	apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API)
})(MapComponent);