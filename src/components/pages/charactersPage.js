import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import GotService from '../../services/gotService';
import RandomItem from '../randomItem';
import { withRouter } from 'react-router-dom';
class CharactersPage extends Component {

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
				about={'character'}
				range={[40, 140]}
				getData={this.got.getCharacter}
				dataProcessing={(char) => {
					const { gender, born, died, culture } = char;
					return {
						'Gender': gender,
						'Born': born,
						'Died': died,
						'Culture': culture
					};
				}} />
		);

		const itemList = (
			<ItemList
				about={'characters'}
				onItemSelected={(id) => {
					this.props.history.push(id);
				}}
				getDataAll={this.got.getAllCharacters}
				renderItem={({ name, gender }) => `${name} (${gender})`} />
		);

		return (
			<RowBlock random={randomCharacter} list={itemList} />
		)
	}
}
export default withRouter(CharactersPage);