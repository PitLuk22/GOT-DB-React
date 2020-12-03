import React, { Component } from 'react';
import { Col } from 'reactstrap';
import ItemDetails, { Record } from '../itemDetails'
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';


export default class HousesItem extends Component {

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
						itemID={this.props.houseID}
						getData={this.got.getHouse} >

						<Record field='region' label='Region' />
						<Record field='words' label='Words' />
						<Record field='coatOfArms' label='Coat of arms' />

					</ItemDetails>
				</Col>
			</>
		)
	}
}

