import { React, Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Spinner from '../spinner/spinner';
import GotService from '../../services/gotService';
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
`;
export default class itemList extends Component {

	got = new GotService();

	// 0) Set State
	state = {
		charList: null
	}

	// 5) when component was rendered, get info from API and set State
	componentDidMount() {
		this.onUpdateList();
	}

	generateRandomKey() {
		return new Date().getTime() + Math.random(0.5);
	}

	onUpdateList = () => {
		const numberOfPage = Math.floor(Math.random() * 100 + 5);

		// Change state for Spinner
		this.setState({ charList: null });

		this.got.getAllCharacters(numberOfPage)
			.then((charList) => this.setState({ charList }));
	}

	renderItems(arr) {
		// 3) return Spinners if (arr === null)
		// 8) return Names 
		const array = arr ? arr : Array(10).fill(<Spinner />);

		return array.map(item => {
			const element = item.name ? item.name : item;
			const uniqueKey = this.generateRandomKey();
			return (
				<ListGroupItemPointer
					key={uniqueKey}
					onClick={() => this.props.onCharSelected(item.id)}>
					{element}
				</ListGroupItemPointer>
			)
		})
	}

	// 1) start render component
	// 6) render component after set State
	render() {
		console.log('render');
		const arr = this.state.charList;
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