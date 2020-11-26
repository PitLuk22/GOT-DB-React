import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Record } from '../itemDetails'
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import GotService from '../../services/gotService';


export default class HousesPage extends Component {

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
				about={'houses'}
				onItemSelected={this.onItemSelected}
				getDataAll={this.got.getAllHouses}
				renderItem={({ name, region }) => `${name} (${region})`} />
		);

		const houseDetails = (
			<>
				<ItemDetails
					selectedItemID={this.state.selectedItemID}
					getData={this.got.getHouse} >

					<Record field='region' label='Region' />
					<Record field='words' label='Words' />
					<Record field='coatOfArms' label='Coat of arms' />

				</ItemDetails>
			</>
		)

		return (
			<RowBlock left={itemList} right={houseDetails} />
		)
	}
}