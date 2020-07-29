import React from 'react';
import Table from "../../Reusable/Table";
import MapComponent from '../../Reusable/Map';
import moment from "moment";

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
			showMap: false,
			data: [],
			loading: false
		};

	}

	componentDidMount() {
		this.setState({
			loading: true
		})

		this.props.client.getEntries().then((data) => {

				let tableData = this.formatData(data.items);

				this.setState({
					data: tableData,
					loading: false
				})

			})
			.catch(console.error)

	}

	filterEntries = (value) => {

		this.setState({
			loading: true
		})

		let filterQuery;
		if (value === 'today') {
			filterQuery = {content_type: 'tangibleOccupy', 'fields.eventDate[gt]': moment().startOf('day').toISOString(), 'fields.eventDate[lt]': moment().endOf('day').toISOString()};
		} else if (value === 'future') {
			filterQuery = {content_type: 'tangibleOccupy', 'fields.eventDate[gt]': moment().toISOString()};
		} else {
			filterQuery = {content_type: 'tangibleOccupy', 'fields.eventDate[lt]': moment().toISOString()};
		}

		this.props.client.getEntries(filterQuery)
		.then((response) => {

			let tableData = this.formatData(response.items);

			this.setState({
				data: tableData,
				loading: false
			})

		})
			 .catch(console.error)
	}

	formatData = (data) => {
		let tableData = data.map((row, index) => {
			const eventName = row.fields.eventName;
			const eventDate = row.fields.eventDate;
			const eventDescription = row.fields.eventDescription.content[0].content[0].value;
			const eventLocation = [row.fields.eventLocation.lat, row.fields.eventLocation.lon];
			const referenceLink = row.fields.referenceLink.content[0].content[1].data.uri;
			return {eventName: eventName, eventDate: eventDate, eventDescription: eventDescription, eventLocation: eventLocation, referenceLink: referenceLink}
		})

		return tableData;
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

		const mapStyle = {
			position: 'relative'
		}

		return (
			<React.Fragment>
				<div className="tangible-occupy__view-map" onClick={() => this.toggleMap()}>View Map</div>
				<div className="tangible-occupy__view-today" onClick={() => this.filterEntries('today')}>Filter By Today's Events</div>
				<div className="tangible-occupy__view-forward" onClick={() => this.filterEntries('future')}>Filter By All Future Events</div>
				<div className="tangible-occupy__view-archived" onClick={() => this.filterEntries('past')}>Filter By All Past Events</div>


				{this.state.showMap &&
					<MapComponent style={mapStyle} data={this.state.data}/>
				}
				<Table columns={columns} data={this.state.data} />
			</React.Fragment>
		)
	}
}
