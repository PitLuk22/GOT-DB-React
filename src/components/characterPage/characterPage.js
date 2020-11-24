import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails, { Record } from '../charDetails'
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

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

	onItemSelected = (id) => {
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

		const itemList = (
			<ItemList
				about={this.props.about}
				onItemSelected={this.onItemSelected}
				getData={this.props.getData}
				renderItem={this.props.renderItem} />
		);

		const charDetails = (
			<>
				<CharDetails selectedCharID={this.state.selectedCharID}>
					<Record field='gender' label='Gender' />
					<Record field='born' label='Born' />
					<Record field='died' label='Died' />
					<Record field='culture' label='Culture' />
				</CharDetails>
			</>
		)

		return (
			<RowBlock left={itemList} right={charDetails} />
		)
	}
}