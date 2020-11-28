import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Header from '../header';
import GotService from '../../services/gotService'
import { MainPage, CharactersPage, HousesPage, BooksPage, BooksItem } from '../pages';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ErrorMessage from '../errorMessage';

//TODO: Сделать mainPage, связать роутами, обработать неверный путь, написать компонент с ошибкой и ссылкой на mainPage
export default class App extends Component {

	// state = {
	// 	pathes: ['/', '/characters/', '/houses/', '/books/']
	// }
	pathes = ['/', '/characters/', '/houses/', '/books/'];
	got = new GotService();

	checkPageID(location) {
		const ranges = {
			characters: [1, 140],
			houses: [1, 40],
			books: [1, 10],

		}

		const arr = location.pathname.split('/');
		const max = ranges[arr[1]][1];
		const min = ranges[arr[1]][0];

		if (this.pathes.includes(location.pathname)
			|| (+arr[arr.length - 1] >= min
				&& +arr[arr.length - 1] <= max)) {
			console.log('true');
		} else {
			return (
				<ErrorMessage />
			)
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
								<Route path='/characters' exact component={CharactersPage} />
								<Route path='/houses' component={HousesPage} />
								<Route path='/books' exact component={BooksPage} />
								<Route path='/books/:id' render={
									({ match }) => {
										const { id } = match.params;
										return <BooksItem bookID={id} />;
									}
								} />
								<Route path='' render={
									({ location }) => {
										return this.checkPageID(location);
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
