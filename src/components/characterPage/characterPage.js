import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Record } from '../itemDetails'
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

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

	generateRandomKey() {
		return new Date().getTime() + Math.random();
	}

	setFieldAndLabel(arr) {
		return arr.map(field => {
			const label = field[0].toUpperCase() + field.slice(1);
			return (
				<Record
					key={this.generateRandomKey()}
					field={field}
					label={label} />
			)
		})
	}

	render() {

		if (this.state.error) {
			return (
				<ErrorMessage />
			)
		}

		const children = this.setFieldAndLabel(this.props.fieldArray);

		const itemList = (
			<ItemList
				about={this.props.about}
				onItemSelected={this.onItemSelected}
				getDataAll={this.props.getDataAll}
				renderItem={this.props.renderItem} />
		);

		const charDetails = (
			<>
				<ItemDetails
					selectedItemID={this.state.selectedItemID}
					getData={this.props.getData}
				>
					{children}
					{/* <Record field='gender' label='Gender' />
					<Record field='born' label='Born' />
					<Record field='died' label='Died' />
					<Record field='culture' label='Culture' /> */}
				</ItemDetails>
			</>
		)

		return (
			<RowBlock left={itemList} right={charDetails} />
		)
	}
}