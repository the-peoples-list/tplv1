import React from 'react';
import Table from "../../Reusable/Table";
import MapComponent from '../../Reusable/Map';
import moment from "moment";
import ApiService from "../../Reusable/ApiService";
import './tangibleOccupy.scss';

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
			loading: false,
			coords: {lat: 40.650002, lng: -73.949997}
		};

	}

	componentDidMount() {
		this.setState({
			loading: true
		})
		this.filterEntries('future')
	}

	filterEntries = (value) => {

		value = typeof(value) === 'object' ? value.target.value : value;
		this.setState({
			loading: true
		})

		let filterQuery;
		if (value === 'today') {
			filterQuery = {content_type: 'tangibleOccupy', 'fields.eventDate[gt]': moment().startOf('day').toISOString(), 'fields.eventDate[lt]': moment().endOf('day').toISOString()};
		} else if (value === 'future') {
			filterQuery = {content_type: 'tangibleOccupy', 'fields.eventDate[gt]': moment().toISOString()};
		} else if (value === 'past') {
			filterQuery = {content_type: 'tangibleOccupy', 'fields.eventDate[lt]': moment().toISOString()};
		} else if (value === 'all') {
			filterQuery = {content_type: 'tangibleOccupy'};
		} else if (value === 'oneMileFromMe') {
			// For reference the last number is the radius within which the long/lat will center - this number is in km so is equivalent to 1 mile
			if (!this.state.coords.latitude){
				return "These are not the droids you're looking for";
			} else {
				filterQuery = {content_type: 'tangibleOccupy', 'fields.eventLocation[within]': this.state.coords.latitude + ',' + this.state.coords.longitude + ', 1.609'};
			}
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
			const eventDescription = !row.fields.eventDescription ? '' : row.fields.eventDescription.content[0].content[0].value;
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

	/**
	 * Function that conditionally renders dropdown for filtering.
	 */
	renderDateDropdownFilter = () => {
		return (
			<select onChange={this.filterEntries} defaultValue='future' className="tangible-occupy__view-select">
				<option className="tangible-occupy__view-archived" value='all'>Show All Events</option>
				<option className="tangible-occupy__view-today" value='today'>Filter By Today's Events</option>
				<option className="tangible-occupy__view-forward" default value='future'>Filter By All Future Events</option>
				<option className="tangible-occupy__view-archived" value='past'>Filter By All Past Events</option>
			</select>
		);
	};

	keyPress = (e) => {
		if(e.keyCode == 13){
			ApiService.getCoords(this.state.myZip).then(data => {
				this.setState({
					coords: {
						lat: data.results[0].geometry.location.lat,
						lng: data.results[0].geometry.location.lng
					}
				})

				this.filterEntries('oneMileFromMe');
			})
		}
	}

	handleChange = (e) => {
		this.setState({
			myZip: e.target.value
		})
	}

	renderLocationInput = () => {
		return (
			<div className="tangible-occupy__view-input">
				<input
					onKeyDown={this.keyPress}
					type="text"
					onChange={ this.handleChange }
					name="getMyLocation"
					//className="tangible-occupy__location-input-enter"
					value={this.state.myZip}
					placeholder='Enter zip code'
				/>
			</div>
		)
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
				<div className="tangible-occupy__view">
					{this.renderLocationInput()}
					<div className="tangible-occupy__view-map" onClick={() => this.toggleMap()}>View Map</div>
					{this.renderDateDropdownFilter()}
				</div>

				{this.state.showMap &&
					<MapComponent style={mapStyle} data={this.state.data} coords={this.state.coords} />
				}
				<Table columns={columns} data={this.state.data} />
			</React.Fragment>
		)
	}
}
