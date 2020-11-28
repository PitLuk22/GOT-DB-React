import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Record } from '../itemDetails'
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import GotService from '../../services/gotService';
import RandomItem from '../randomItem';


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

		const randomHouse = (
			<RandomItem
				about={'house'}
				range={[5, 40]}
				getData={this.got.getHouse}
				dataProcessing={(house) => {
					const { region, words, coatOfArms } = house;
					return {
						'Region': region,
						'Words': words,
						'Coat of arms': coatOfArms
					};
				}} />
		);

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
			<RowBlock random={randomHouse} left={itemList} right={houseDetails} />
		)
	}
}