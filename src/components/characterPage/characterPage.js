import React, { Component } from 'react';
import { Col } from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails'
import ErrorMessage from '../errorMessage';


export default class CharacterPage extends Component {

	state = {
		selectedCharID: null,
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	onCharSelected = (id) => {
		this.setState({
			selectedCharID: id
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
				<Col md="6" lg="4">
					<ItemList onCharSelected={this.onCharSelected} />
				</Col>
				<Col md="12" lg="4">
					<CharDetails selectedCharID={this.state.selectedCharID} />
				</Col>
			</>
		)
	}
}