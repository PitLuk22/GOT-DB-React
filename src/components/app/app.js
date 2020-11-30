import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Header from '../header';
import GotService from '../../services/gotService'
import { MainPage, CharactersPage, HousesPage, BooksPage, BooksItem } from '../pages';
import { BrowserRouter as Router, Route } from "react-router-dom";
import WrongPath from '../wrongPath';
import ErrorMessage from '../errorMessage';

//TODO: Сделать mainPage, связать роутами, обработать неверный путь, написать компонент с ошибкой и ссылкой на mainPage
export default class App extends Component {

	got = new GotService();

	state = {
		pathes: ['', 'characters', 'houses', 'books'],
		range: {
			characters: { min: 1, max: 200 },
			houses: { min: 1, max: 40 },
			books: { min: 1, max: 12 }
		},
		error: false
	}

	checkPagePath(location) {
		const { pathes, range: { characters, houses, books } } = this.state;

		const arrFromLocation = location.split('/');
		const [, page, numberOfPage] = arrFromLocation;

		if (pathes.includes(page)) {

			switch (page) {
				case pathes[1]:
					if (numberOfPage !== '' && !(numberOfPage >= characters.min && numberOfPage <= characters.max)) {
						return <WrongPath />;
					}
					break;
				case pathes[2]:
					if (numberOfPage !== '' && !(numberOfPage >= houses.min && numberOfPage <= houses.max)) {
						return <WrongPath />;
					}
					break;
				case pathes[3]:
					if (numberOfPage !== '' && !(numberOfPage >= books.min && numberOfPage <= books.max)) {
						return <WrongPath />;
					}
					break;
				default:
				// here main page
			}

		} else {
			return <WrongPath />;
		}
	}

	render() {

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
										return <BooksItem bookID={id} />;
									}
								} />
								<Route path='' render={
									({ location }) => {
										return this.checkPagePath(location.pathname);
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
