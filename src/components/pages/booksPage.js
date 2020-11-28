import React, { Component } from 'react';
import { Col } from 'reactstrap';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import { withRouter } from 'react-router-dom';
import RandomItem from '../randomItem';
class BooksPage extends Component {

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

		const randomBook = (
			<RandomItem
				about={'book'}
				range={[1, 10]}
				getData={this.got.getBook}
				dataProcessing={(house) => {
					const { country, authors, numberOfPages, publisher } = house;
					return {
						'Country': country,
						'Authors': authors,
						'Number of pages': numberOfPages,
						'Publisher': publisher
					};
				}} />
		);


		return (
			<>
				<Col md="6" lg="4">
					{randomBook}
				</Col>
				<Col md="6" lg="8">
					<ItemList
						about={'books'}
						onItemSelected={(id) => {
							this.props.history.push(id);
						}}
						getDataAll={this.got.getAllBooks}
						renderItem={({ name, authors }) => `${name} (${authors})`} />
				</Col>
			</>
		)
	}
}

export default withRouter(BooksPage);