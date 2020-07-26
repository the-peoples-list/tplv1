import React from 'react';
import Table from "../../Reusable/Table";

/**
 * This file serves to get and format the "tangible occupy" data that will then be formatted into the table component
 *
 * @returns {*}
 * @constructor
 */
function TangibleOccupy() {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				columns: [
					{
						Header: 'First Name',
						accessor: 'firstName',
					},
					{
						Header: 'Last Name',
						accessor: 'lastName',
					},
				],
			},
			{
				Header: 'Info',
				columns: [
					{
						Header: 'Age',
						accessor: 'age',
					},
					{
						Header: 'Visits',
						accessor: 'visits',
					},
					{
						Header: 'Status',
						accessor: 'status',
					},
					{
						Header: 'Profile Progress',
						accessor: 'progress',
					},
				],
			},
		],
		[]
	)

	const data = React.useMemo(
		() => [
			{
				col1: 'Hello',
				col2: 'World',
			},
			{
				col1: 'react-table',
				col2: 'rocks',
			},
			{
				col1: 'whatever',
				col2: 'you want',
			},
		],
		[]
	)

	return (
		<div>
			<Table columns={columns} data={data} />
		</div>
	)
}

export default TangibleOccupy
