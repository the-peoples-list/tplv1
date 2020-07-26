import React, { Component } from 'react';
import './primaryview.scss';

export default class PrimaryView extends React.Component {

	/**
	 *  Constructor for PrimaryView component class.
	 *
	 *  @param {object} props The props that get passed
	 */
	constructor(props)
	{
		super(props);

		this.state = {};
	}

	renderSpecificView = () => {

	}

	render()
	{
		return (

			<div>
				<h1>The People's List</h1>
				<h2>A community driven resource for making change</h2>
			</div>
		);
	}
}