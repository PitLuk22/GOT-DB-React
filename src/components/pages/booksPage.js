import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Record } from '../itemDetails'
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import GotService from '../../services/gotService';


export default class BooksPage extends Component {

	got = new GotService();

	state = {
		selectedItemID: null,
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	onItemSelected = (id) => {
		this.setState({
			selectedItemID: id
		})
	}

	render() {

		if (this.state.error) {
			return (
				<ErrorMessage />
			)
		}

		const itemList = (
			<ItemList
				about={'books'}
				onItemSelected={this.onItemSelected}
				getDataAll={this.got.getAllBooks}
				renderItem={({ name, authors }) => `${name} (${authors})`} />
		);

		const bookDetails = (
			<>
				<ItemDetails
					selectedItemID={this.state.selectedItemID}
					getData={this.got.getBook} >

					<Record field='country' label='Country' />
					<Record field='authors' label='Authors' />
					<Record field='numberOfPages' label='Number of pages' />
					<Record field='publisher' label='Publisher' />

				</ItemDetails>
			</>
		)

		return (
			<RowBlock left={itemList} right={bookDetails} />
		)
	}
}