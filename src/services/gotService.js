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
		return this.getResources(`/houses?page=${numberOfPage}&pageSize=10`);
	}
	getHouse = async (id) => {
		return this.getResources(`/houses/${id}`);
	}
	getAllBooks = async (numberOfPage = 5) => {
		return this.getResources(`/books?page=${numberOfPage}&pageSize=10`);
	}
	getBook = async (id) => {
		return this.getResources(`/books/${id}`);
	}
	_transformCharacter(char) {
		const url = char.url.split('/');
		const id = url[url.length - 1];
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
		return {
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			overlord: house.overlord,
			ancestralWeapons: house.ancestralWeapons
		}
	}
	_transformBook(book) {
		return {
			name: book.name,
			authors: book.authors,
			namberOfPages: book.namberOfPages,
			publisher: book.publisher,
			released: book.released
		}
	}
}
