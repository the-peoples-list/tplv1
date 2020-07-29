import React from 'react';
import { useTable, useSortBy } from 'react-table';

import './table.scss';

function Table({ columns, data }) {

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data }, useSortBy)

	return (
		<table {...getTableProps()}>
			<thead>
			{headerGroups.map(headerGroup => (
				<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map(column => (
						<th
							{...column.getHeaderProps(column.getSortByToggleProps())}
						>
							{column.render('Header')}
							<span>
								{column.isSorted
									? column.isSortedDesc
									? ' 🔽'
									: ' 🔼'
								: ''}
							</span>
						</th>
					))}
				</tr>
			))}
			</thead>
			<tbody {...getTableBodyProps()}>
			{rows.map(row => {
				prepareRow(row)
				return (
					<tr {...row.getRowProps()}>
						{row.cells.map(cell => {
							if (cell.column.Header === 'Event Link') {
								return (
									<td
										{...cell.getCellProps()}
									>
										<a href={cell.value} rel="noopener noreferrer" target="_blank">{cell.render('Cell')}</a>
									</td>
								)
							} else {
								return (
									<td
										{...cell.getCellProps()}
									>
										{cell.render('Cell')}
									</td>
								)
							}
						})}
					</tr>
				)
			})}
			</tbody>
		</table>
	)
}

export default Table;