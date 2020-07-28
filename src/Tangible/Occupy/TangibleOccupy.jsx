import React from 'react';
import Table from "../../Reusable/Table";
import MapComponent from '../../Reusable/Map';

/**
 * This file serves to get and format the "tangible occupy" data that will then be formatted into the table component
 *
 * @returns {*}
 * @constructor
 */
export default class TangibleOccupy extends React.Component {

	/**
	 *  Constructor for PrimaryView component class.
	 *
	 *  @param {object} props The props that get passed
	 */
	constructor(props)
	{
		super(props);

		this.state = {
			showMap: false
		};

	}

	toggleMap = () => {
		this.setState(state => ({
			showMap: !state.showMap
		}));
	}

	render () {

		const columns = [
			{
				Header: 'Event Name',
				accessor: 'eventName', // accessor is the "key" in the data
			},
			{
				Header: 'Event Time',
				accessor: 'eventDate',
			},
			{
				Header: 'Event Location',
				accessor: 'eventLocation',
			},
			{
				Header: 'Event Link',
				accessor: 'referenceLink',
			},
			{
				Header: 'Event Description',
				accessor: 'eventDescription',
			},
		];
		const data = this.props.data;

		const mapStyle = {
			position: 'relative'
		}

		return (
			<React.Fragment>
				<div className="tangible-occupy__view-map" onClick={() => this.toggleMap()}>View Map</div>
				{this.state.showMap &&
					<MapComponent style={mapStyle} data={data}/>
				}
				<Table columns={columns} data={data}/>
			</React.Fragment>
		)
	}
}
