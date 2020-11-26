import { React, Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Spinner from '../spinner/spinner';
import styled from 'styled-components';

const ListGroupItemPointer = styled(ListGroupItem)`
	cursor: pointer;
	transition: all .3s ease;
	&:hover {
		color: #fff; 
		background-color: rgba(0,0,0, .8);
		transform: scale(1.1);
		z-index: 10;
	}
`;
const Btn = styled(Button)`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
`;

export default class itemList extends Component {
	constructor(props) {
		super(props)
		this.booksListPage = false;
	}

	// 0) Set State
	state = {
		itemList: null
	}

	// 5) when component was rendered, get info from API and set State
	componentDidMount() {
		this.onUpdateList();
	}

	generateRandomKey() {
		return new Date().getTime() + Math.random();
	}

	setBookslistNumber(boolean) {
		this.booksListPage = !boolean;
		return this.booksListPage ? 1 : 2;
	}

	onUpdateList = () => {
		let numberOfPage = this.props.about.includes('books') ? this.setBookslistNumber(this.booksListPage) : Math.floor(Math.random() * 40 + 5);

		// Change state for Spinner
		this.setState({ itemList: null });

		const { getDataAll } = this.props;
		getDataAll(numberOfPage)
			.then((itemList) => {
				this.setState({ itemList })
			});
	}

	renderItems(arr) {
		// 3) return Spinners if (arr === null)
		// 8) return Names 
		const array = arr ? arr : Array(10).fill(<Spinner />);

		return array.map(item => {

			const { renderItem } = this.props;

			// if current item have property $$typeof => it's a component (Spinner), else it's an char/book/house object 
			const element = item.$$typeof ? item : renderItem(item);
			// render(item) return string. For example: `${name} ${gender}` 
			const uniqueKey = this.generateRandomKey();

			return (
				<ListGroupItemPointer
					key={uniqueKey}
					onClick={() => this.props.onItemSelected(item.id)}>
					{element}
				</ListGroupItemPointer>
			)
		})
	}

	// 1) start render component
	// 6) render component after set State
	render() {
		const arr = this.state.itemList;
		// 2) get Spinners
		// 7) get Names
		const items = this.renderItems(arr);

		// 4) render component with Spinners
		// 9) render component with Names
		return (
			<>
				<ListGroup style={{ marginBottom: '20px' }}>
					{items}
				</ListGroup >
				<Btn
					color="info"
					onClick={this.onUpdateList}>
					Update list
				</Btn>
			</>
		)
	}
} 