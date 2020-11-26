import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Record } from '../itemDetails'
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import GotService from '../../services/gotService';

export default class CharactersPage extends Component {

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
				about={'characters'}
				onItemSelected={this.onItemSelected}
				getDataAll={this.got.getAllCharacters}
				renderItem={({ name, gender }) => `${name} (${gender})`} />
		);

		const charDetails = (
			<>
				<ItemDetails
					selectedItemID={this.state.selectedItemID}
					getData={this.got.getCharacter} >

					<Record field='gender' label='Gender' />
					<Record field='born' label='Born' />
					<Record field='died' label='Died' />
					<Record field='culture' label='Culture' />

				</ItemDetails>
			</>
		)

		return (
			<RowBlock left={itemList} right={charDetails} />
		)
	}
}