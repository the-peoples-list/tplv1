import React  from 'react';
//import {useState} from 'react';
import TangibleBuild from "../Tangible/Build/TangibleBuild";
import TangibleOccupy from "../Tangible/Occupy/TangibleOccupy";
import DigitalBuild from "../Digital/Build/DigitalBuild";
import DigitalOccupy from "../Digital/Occupy/DigitalOccupy";
import AboutTpl from "../Etc/AboutTpl";
import './primaryview.scss';

const contentful = require("contentful");
const client = contentful.createClient({
	// This is the space ID. A space is like a project folder in Contentful terms
	space: process.env.REACT_APP_CONTENTFUL_SPACE,
	// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
	accessToken: process.env.REACT_APP_CONTENTFUL_API
});


export default class PrimaryView extends React.Component {

	/**
	 *  Constructor for PrimaryView component class.
	 *
	 *  @param {object} props The props that get passed
	 */
	constructor(props)
	{
		super(props);

		this.state = {
			loading: false,
			data: [{eventName: '', eventDate: '', eventDescription: '', eventLocation: '', referenceLink: ''}]
		};
	}

	componentDidMount() {
		this.setState({
			loading: true
		})
		this.renderTableData();
	}

	renderTableData = () => {

		this.setState({
			loading: false,
			chosenView: 'tangibleOccupy'
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot)
	{
		if(prevState.data !== this.state.data){
			console.log()
		}
	}

	renderSpecificView = () => {

		const viewToSelect = !this.state.chosenView ? this.props.chosenView : this.state.chosenView;

		//console.log(this.state.data);
		switch (viewToSelect) {
			case 'tangibleOccupy':
				return (
					<TangibleOccupy client={client}/>
				)
				break;
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
				return ('')
		}
	}



	render() {
		return (

			<React.Fragment>
				<h1>The People's List</h1>
				<h2>A community driven resource for making change</h2>

				<div>
					{this.renderSpecificView()}
				</div>
			</React.Fragment>
		);
	}
}