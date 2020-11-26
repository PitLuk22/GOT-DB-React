import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharactersPage from '../pages/charactersPage';
import HousesPage from '../pages/housesPage';
import BooksPage from '../pages/booksPage';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Btn = styled(Button)`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
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
				<Router>
					<div className='app'>
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
								<Route path='/characters' component={CharactersPage} />
								<Route path='/houses' component={HousesPage} />
								<Route path='/books' component={BooksPage} />
							</Row>
						</Container>
					</div>
				</Router>
			</>
		);
	}
}

