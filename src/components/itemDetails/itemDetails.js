import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import InfoSpan from '../infoSpan'
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage';
import WrongPath from '../wrongPath';
import styled from 'styled-components';


const Block = styled.div`
	background-color: #fff;
    padding: 25px;
	margin-bottom: 40px;
	font-size: 16px;
	&:hover span i{
		animation: horizontalArrow .8s ease-in-out infinite;
	}
	@keyframes horizontalArrow {
 		0% {transform: translateX(0);}
 		50% {transform: translateX( -10px);}
		100% {transform: translateX( 0);}
	}
	span {
		font-size: 16px;
		i {
			display: inline-block;
			font-size: 25px;
			transition: all .3s ease;
			transform: rotate(0);
		}
	}
		
	@media(max-width: 767px) {
		text-align: center;
		span i {
			transform: rotate(90deg)
		}
		&:hover span i {
			animation: verticalarrow .8s ease-in-out infinite;
		}
		@keyframes verticalarrow {
		0% {transform: translateY(0) rotate(90deg);}
		50% {transform: translateY(-10px)rotate(90deg);}
		100% {transform: translateY(0) rotate(90deg);}
		}	
	}
`;

const Title = styled.h4`
	margin-bottom: 20px;
	text-align: center;
	font-weight: bold;
	span {
		font-size: 24px;
	}
`;

const Term = styled.span`
	font-weight: bold;
`;

// field contains params (gender, born, died, culture)
// char - it's object with certain character data
// char[field] === cahr.gender or char.born or char.died or char.culture
const Record = ({ item, field, label, loading }) => {
	return (
		<ListGroupItem className='d-flex justify-content-between'>
			<Term className='term'>{label}</Term>
			<InfoSpan info={item[field]} load={loading} />
		</ListGroupItem>
	)
}

export { Record };

//TODO: Заменить в этом компоненте char на что-то нейтральное!! //FIXME:
export default class ItemDetails extends Component {

	state = {
		item: null,
		loading: true,
		error: false,
		wrongPath: false
	}

	componentDidMount() {
		this.getItem();
	}
	componentDidUpdate(prevProps) {
		if (this.props.bookID !== prevProps.bookID) {
			this.getItem();
		}
	}
	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	getItem = () => {
		if (!this.props.bookID) {
			return;
		}
		this.setState({ loading: true })
		const { bookID, getData } = this.props;


		getData(bookID)
			.then(item => {
				this.setState({
					item: item,
					loading: false
				})
			})
			.catch(() => {
				this.setState({
					wrongPath: true
				})
			})
		// this.foo.bar = 0; // error generator
	}

	render() {
		//Error
		if (this.state.error) {
			console.log('we found a error in render');
			return (
				<ErrorMessage />
			)
		}
		// Wrong path
		if (this.state.wrongPath) {
			console.log('you a lost');
			return (
				<WrongPath />
			)
		}

		// arrow or Spinner
		if (!this.state.item) {
			const Arrow_Spinner = !this.props.bookID ? <i className='arrow'>&larr;</i> : <Spinner />;
			return (
				<Block className='rounded activate-arrow'>
					<span>{Arrow_Spinner} Please, select a character!</span>
				</Block>
			)
		}

		// Correct info about certain character
		const { item, loading } = this.state;
		const { name } = item;

		return (
			<Block className='rounded'>
				<Title><InfoSpan info={name} load={loading} /></Title>
				<ListGroup flush>
					{
						React.Children.map(this.props.children, (child) => {
							return React.cloneElement(child, { item, loading })
						})
					}
				</ListGroup>
			</Block>
		);
	}
}

