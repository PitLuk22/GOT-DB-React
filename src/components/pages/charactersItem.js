import React, { Component } from 'react';
import { Col } from 'reactstrap';
import ItemDetails, { Record } from '../itemDetails'
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';


export default class CharacterItem extends Component {

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
		console.log(this.props)
		return (
			<>
				<Col md={{ size: 6, offset: 3 }} lg={{ size: 8, offset: 2 }}>
					<ItemDetails
						itemID={this.props.characterID}
						getData={this.got.getCharacter} >

						<Record field='gender' label='Gender' />
						<Record field='born' label='Born' />
						<Record field='died' label='Died' />
						<Record field='culture' label='Culture' />

					</ItemDetails>
				</Col>
			</>
		)
	}
}