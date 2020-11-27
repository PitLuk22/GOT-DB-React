import React, { Component } from 'react';
import { Col } from 'reactstrap';
import ItemDetails, { Record } from '../itemDetails'
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';


export default class BooksItem extends Component {

	got = new GotService();

	state = {
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	render() {

		if (this.state.error) {
			return (
				<ErrorMessage />
			)
		}

		return (
			<>
				<Col md="6" lg="8">
					<ItemDetails
						bookID={this.props.bookID}
						getData={this.got.getBook} >

						<Record field='country' label='Country' />
						<Record field='authors' label='Authors' />
						<Record field='numberOfPages' label='Number of pages' />
						<Record field='publisher' label='Publisher' />

					</ItemDetails>
				</Col>
			</>
		)
	}
}