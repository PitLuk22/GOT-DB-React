import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Header from '../header';
import GotService from '../../services/gotService'
import { MainPage, CharactersPage, HousesPage, BooksPage, BooksItem } from '../pages';
import { BrowserRouter as Router, Route } from "react-router-dom";
import WrongPath from '../wrongPath';

//TODO: Сделать mainPage, связать роутами, обработать неверный путь, написать компонент с ошибкой и ссылкой на mainPage
export default class App extends Component {

	got = new GotService();

	state = {
		pathes: ['/', '/characters/', '/houses/', '/books/'],
		error: false
	}

	checkPagePath(location, pathes) {
		if (!pathes.includes(location)) {
			return <WrongPath />
		}
	}

	checkWrongNumberOfPage() {
		return <WrongPath />
	}

	render() {

		const pathes = this.state.pathes;

		return (
			<>
				<Router>
					<div className='app'>
						<Container>
							<Header />
							<Row className='mt-5'>

								<Route path='/' exact component={MainPage} />
								<Route path='/characters/' exact component={CharactersPage} />
								<Route path='/houses/' component={HousesPage} />
								<Route path='/books/' exact component={BooksPage} />
								<Route path='/books/:id' render={
									({ match }) => {
										const { id } = match.params;
										typeof +id === 'number' ? pathes[3] = `/books/${id}` : this.checkWrongNumberOfPage();
										return <BooksItem bookID={id} />;
									}
								} />
								<Route path='' render={
									({ location }) => {
										return this.checkPagePath(location.pathname, pathes);
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
