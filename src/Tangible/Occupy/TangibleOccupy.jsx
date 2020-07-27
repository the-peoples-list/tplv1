import React from 'react';
import Table from "../../Reusable/Table";

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
		};
	}

render ()
{
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

	return (
		<div>
			<Table columns={columns} data={data}/>
		</div>
	)
}
}
