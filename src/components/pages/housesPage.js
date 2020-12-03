import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import GotService from '../../services/gotService';
import RandomItem from '../randomItem';
import { withRouter } from 'react-router-dom';
class HousesPage extends Component {

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

		const randomCharacter = (
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
				onItemSelected={(id) => {
					this.props.history.push(id);
				}}
				getDataAll={this.got.getAllHouses}
				renderItem={({ name, region }) => `${name} (${region})`} />
		);

		return (
			<RowBlock random={randomCharacter} list={itemList} />
		)
	}
}
export default withRouter(HousesPage);