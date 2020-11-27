import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import { CharactersPage, HousesPage, BooksPage, BooksItem } from '../pages';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from "react-router-dom";


const Btn = styled(Button)`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
`;
//TODO: Сделать mainPage, связать роутами, обработать неверный путь, написать компонент с ошибкой и ссылкой на mainPage
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
								<Route path='/characters' exact component={CharactersPage} />
								<Route path='/houses' component={HousesPage} />
								<Route path='/books' exact component={BooksPage} />
								<Route path='/books/:id' render={
									({ match }) => {
										const { id } = match.params;
										return <BooksItem bookID={id} />;
									}
								} />
							</Row>
						</Container>
					</div>
				</Router>
			</>
		);
	}
}
