import React  from 'react';
//import {useState} from 'react';
import TangibleBuild from "../Tangible/Build/TangibleBuild";
import TangibleOccupy from "../Tangible/Occupy/TangibleOccupy";
import DigitalBuild from "../Digital/Build/DigitalBuild";
import DigitalOccupy from "../Digital/Occupy/DigitalOccupy";
import AboutTpl from "../Admin/AboutTpl";

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

		const viewToSelect = !this.state.chosenView ? this.props.chosenView : this.state.chosenView;

		switch (viewToSelect) {
			case 'tangibleBuild':
				return (
					<TangibleBuild/>
				)
				break;

			case 'digitalBuild':
				return (
					<DigitalBuild/>
				)
				break;

			case 'digitalOccupy':
				return (
					<DigitalOccupy/>
				)
				break;

			case 'aboutTpl':
				return (
					<AboutTpl/>
				)
				break;
			default:
				return (
					<TangibleOccupy/>
				)
				break;
		}
	}



	render()
	{
		return (

			<div>
				<h1>The People's List</h1>
				<h2>A community driven resource for making change</h2>

				<div>
					{this.renderSpecificView()}
				</div>
			</div>
		);
	}
}