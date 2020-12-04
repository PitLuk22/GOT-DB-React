import React, { useState, useEffect } from 'react';
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

function ItemList({ about, getDataAll, renderItem, onItemSelected }) {

	const [itemList, updateItemList] = useState(null);
	const [booksListPage, updateBooksListPage] = useState(false);

	useEffect(() => {
		onUpdateList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [null]);

	// Create unique KEY
	function generateRandomKey() {
		return new Date().getTime() * Math.random();
	}

	// func for booksPage
	function setBookslistNumber() {
		updateBooksListPage(!booksListPage);
		return booksListPage ? 1 : 2;
	}

	// func with server work 
	function onUpdateList() {
		let numberOfPage = about.includes('books') ? setBookslistNumber() : Math.floor(Math.random() * 40 + 5);

		// Change state for Spinner
		updateItemList(null);

		getDataAll(numberOfPage)
			.then((data) => {
				updateItemList(data)
			});
	}

	// return arr with elements 
	function renderItems(arr) {

		const array = arr ? arr : Array(10).fill(<Spinner />);

		return array.map(item => {

			// if current item have property $$typeof => it's a component (Spinner), else it's an char/book/house object 
			const element = item.$$typeof ? item : renderItem(item);
			// render(item) return string. For example: `${name} ${gender}` 
			const uniqueKey = generateRandomKey();

			return (
				<ListGroupItemPointer
					key={uniqueKey}
					onClick={() => onItemSelected(item.id)}>
					{element}
				</ListGroupItemPointer>
			)
		})
	}

	const items = renderItems(itemList);

	return (
		<>
			<ListGroup style={{ marginBottom: '20px' }}>
				{items}
			</ListGroup >
			<Btn
				color="info"
				onClick={() => onUpdateList()}>
				Update list
			</Btn>
		</>
	)
}
export default ItemList;