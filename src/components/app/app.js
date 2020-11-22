import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import styled from 'styled-components';

const Btn = styled(Button)`
	padding: 10px 20px;
	width: 100%;
`;

export default class App extends Component {

	state = {
		showRandomChar: true,
		selectedChar: null
	}

	onCharSelected = (id) => {
		this.setState({
			selectedChar: id
		})
	}

	toggleRandomChar = () => {
		this.setState({
			showRandomChar: !this.state.showRandomChar
		})

	}

	render() {

		const randomCharBlock = this.state.showRandomChar ? <RandomChar /> : null;
		const btnText = this.state.showRandomChar ? 'Close' : 'Open';

		return (
			<>
				<Container>
					<Header />
					<Row className='mt-5'>
						<Col md="6" lg="4">
							{randomCharBlock}
							<Btn
								color="primary"
								onClick={this.toggleRandomChar}>
								{btnText} random character block
							</Btn>
						</Col>
						<Col md="6" lg="4">
							<ItemList onCharSelected={this.onCharSelected} />
						</Col>
						<Col md="12" lg="4">
							<CharDetails selectedChar={this.state.selectedChar} />
						</Col>
					</Row>
				</Container>

			</>
		);
	}
}

