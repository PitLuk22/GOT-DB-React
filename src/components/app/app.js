import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import GotService from '../../services/gotService';
import styled from 'styled-components';

const Btn = styled(Button)`
	width: 100%;
	padding: 10px;
`;

export default class App extends Component {

	got = new GotService();

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
							<RandomChar showHide={this.state.showRandomChar} />
							<Btn
								color="primary"
								onClick={this.toggleRandomChar}>
								{btnText} random character block
							</Btn>
						</Col>
						<CharacterPage
							about={'characters'}
							getDataAll={this.got.getAllCharacters}
							getData={this.got.getCharacter}
							fieldArray={['gender', 'born', 'died', 'culture']}
							renderItem={({ name, gender }) => `${name} (${gender})`} />
						<CharacterPage
							about={'houses'}
							getDataAll={this.got.getAllHouses}
							getData={this.got.getHouse}
							fieldArray={['region', 'words', 'coatOfArms']}
							renderItem={({ name, region }) => `${name} (${region})`} />
						<CharacterPage
							about={'books'}
							getDataAll={this.got.getAllBooks}
							getData={this.got.getBook}
							fieldArray={['country', 'authors', 'numberOfPages', 'publisher']}
							renderItem={({ name, authors }) => `${name} (${authors})`} />
					</Row>
				</Container>
			</>
		);
	}
}

