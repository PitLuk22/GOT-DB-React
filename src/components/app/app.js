import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import styled from 'styled-components';

const Btn = styled(Button)`
	width: 100%;
	padding: 10px;
`;

export default class App extends Component {

	state = {
		showRandomChar: true
	}

	toggleRandomChar = () => {
		this.setState({
			showRandomChar: !this.state.showRandomChar
		})
	}

	render() {
		// const randomCharBlock = this.state.showRandomChar ? <RandomChar /> : null;
		const btnText = this.state.showRandomChar ? 'Close' : 'Open';

		return (
			<>
				<Container>
					<Header />
					<Row className='mt-5'>
						<Col md="6" lg="4">
							{/* {randomCharBlock} */}
							<RandomChar showHide={this.state.showRandomChar} />
							<Btn
								color="primary"
								onClick={this.toggleRandomChar}>
								{btnText} random character block
							</Btn>
						</Col>
						<CharacterPage />
					</Row>
				</Container>

			</>
		);
	}
}

