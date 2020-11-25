export default class GotService {
	constructor() {
		this._baseApi = 'https://anapioficeandfire.com/api';
	}

	async getResources(url) {
		const res = await fetch(this._baseApi + url);

		if (!res.ok) {
			throw new Error(`Could not fetch: ${this._baseApi}${url}, recieve: ${res.status}`)
		}

		return await res.json();
	}

	getAllCharacters = async (numberOfPage = 5) => {
		const res = await this.getResources(`/characters?page=${numberOfPage}&pageSize=10`)
		return res.map(char => this._transformCharacter(char));
	}
	getCharacter = async (id) => {
		const character = await this.getResources(`/characters/${id}`);
		return this._transformCharacter(character);
	}
	getAllHouses = async (numberOfPage = 5) => {
		const res = await this.getResources(`/houses?page=${numberOfPage}&pageSize=10`);
		return res.map(house => this._transformHouse(house));
	}
	getHouse = async (id) => {
		const house = await this.getResources(`/houses/${id}`);
		return this._transformHouse(house);
	}
	getAllBooks = async (numberOfPage = 5) => {
		const res = await this.getResources(`/books?page=${numberOfPage}&pageSize=10`);
		return res.map(book => this._transformBook(book));
	}
	getBook = async (id) => {
		const book = await this.getResources(`/books/${id}`);
		return this._transformBook(book);
	}

	getID(item) {
		const url = item.url.split('/');
		return url[url.length - 1];
	}

	_transformCharacter(char) {
		const id = this.getID(char);
		return {
			id: id,
			name: char.name,
			gender: char.gender,
			born: char.born,
			died: char.died,
			culture: char.culture
		}
	}
	_transformHouse(house) {
		const id = this.getID(house);
		return {
			id: id,
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			coatOfArms: house.coatOfArms,
			ancestralWeapons: house.ancestralWeapons
		}
	}
	_transformBook(book) {
		const id = this.getID(book);
		return {
			id: id,
			name: book.name,
			authors: book.authors,
			numberOfPages: book.numberOfPages,
			publisher: book.publisher,
			country: book.country
		}
	}
}
