import React from 'react';
import './contentEntry.scss';

export default class ContentEntry extends React.Component {

	/**
	 *  Constructor for ContentEntry component class.
	 *
	 *  @param {object} props The props that get passed
	 */
	constructor(props) {
		super(props);

		this.state = {
			fields: {
				eventName:'',
				eventDescription: '',
				eventLocation: {},
				eventDate: '',
				referenceLink: '',
				tags: [],

			},
			addedFields: {
				ongoingEvent: false,
				entrantsEmail: ''
			}
		};
	}

	componentDidMount() {
		this.getTagsForPopulation();
	}

	getTagsForPopulation = () => {
		const client = this.props.client;
		client.getContentType('tangibleOccupy').then(info => {
			return info.fields[4].items.validations[0].in
		 })
	}

	addNewEntry = () => {

		const contentful = require('contentful-management')

		const client = contentful.createClient({
			accessToken: process.env.REACT_APP_CONTENTFUL_API_CONTENT_MGT
		})

		console.log(this.state.fields)
		const newEntry = {fields: {eventName: {"en-US": this.state.fields.eventName}, eventDescription: {"en-US": this.state.fields.eventDescription}, eventLocation: {"en-US": this.state.fields.eventLocation}, eventDate: {"en-US": this.state.fields.eventDate}, referenceLink: {"en-US": this.state.fields.referenceLink}, tags: [],}}
		client.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
			   .then((space) => space.createEntry(this.props.contentTypeId, newEntry))
			   .then((entry) => console.log(entry))
			   .catch(console.error)

	}

	contentType = () => {
		switch ( this.props.contentTypeId ) {
			case 'tangibleOccupy':
				return 'In Person Event'
				break;
			case 'tangibleBuild':
				return ''
				break;
			case 'digitalBuild':
				return ''
				break;
			case 'digitalOccupy':
				return 'Digital Event or Resource'
				break;
			case 'aboutTpl':
				return ''
				break;
			default:
				return ('')
		}
	}

	handleChange = (e) => {
		this.setState({
			...this.state,
			fields: {
				...this.state.fields,
				[e.target.name]: e.target.value
			}
		})
	}

	handleAdditionalInfo = (e) => {
		this.setState({
			...this.state,
			addedFields: {
				...this.state.addedFields,
				[e.target.name]: e.target.value
			}
		})
	}
	renderInputFields = () => {

		return (
			<div className="content-entry__field">
				<input
					onKeyDown={this.keyPress}
					type="text"
					onChange={ this.handleChange }
					name="eventName"
					value={this.state.fields.eventName}
					placeholder='Enter your event name'
				/>
				<input
					onKeyDown={this.keyPress}
					type="text"
					onChange={ this.handleChange }
					name="eventDescription"
					value={this.state.fields.eventDescription}
					placeholder='Enter any additional description'
				/>
				<input
					onKeyDown={this.keyPress}
					type="text"
					onChange={ this.handleChange }
					name="eventLocation"
					value={this.state.fields.eventLocation}
					placeholder='Select a location'
				/>
				<input
					onKeyDown={this.keyPress}
					type="datetime-local"
					onChange={ this.handleChange }
					name="eventDate"
					value={this.state.fields.eventDate}
					placeholder='Enter a date and time'
				/>
				<input
					onKeyDown={this.keyPress}
					type="checkbox"
					onChange={ this.handleAdditionalInfo }
					name="ongoingEvent"
					value={this.state.ongoingEvent}
				/>
				<input
					onKeyDown={this.keyPress}
					type="text"
					onChange={ this.handleChange }
					name="tags"
					value={this.state.fields.tags}
					placeholder='Enter appropriate tags'
				/>
				<input
					onKeyDown={this.keyPress}
					type="url"
					onChange={ this.handleChange }
					name="referenceLink"
					value={this.state.fields.referenceLink}
					placeholder='Enter url for more info or where you found the event'
				/>
				<input
					onKeyDown={this.keyPress}
					type="email"
					onChange={ this.handleAdditionalInfo }
					name="entrantsEmail"
					value={this.state.fields.entrantsEmail}
					placeholder='Enter an email where we can reach you with questions if needed'
				/>
			</div>
		)
	}

	render() {

		return (
			<div className="content-entry">
				<h3>Create New {this.contentType()}</h3>
				<button className="content-entry__close" onClick={this.props.closeModal}>close</button>
					{this.renderInputFields()}
					<div className="g-recaptcha"
						 data-sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_SITE_KEY}
						 data-callback="onSubmit"
						 data-size="invisible">
					</div>
					<button onClick={() => this.addNewEntry()}>
						Submit
					</button>
			</div>
		);

	}
};