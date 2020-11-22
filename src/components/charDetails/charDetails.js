import { React, Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import styled from 'styled-components';


const RandomBlock = styled.div`
	background-color: #fff;
    padding: 25px 25px 15px 25px;
	margin-bottom: 40px;
`;

const Title = styled.h4`
	margin-bottom: 20px;
	text-align: center;
`;

const Term = styled.span`
	font-weight: bold;
`;


export default class CharDetails extends Component {

	got = new GotService();

	state = {
		char: null
	}


	getChar = () => {
		if (!this.props) {
			return (
				<span>Please select a character</span>
			)
		} else {
			this.got.getCharacter(this.props.selectedChar)
				.then(char => this.setState({ char }))
				.catch()
		}

	}

	render() {

		this.getChar();

		return (
			<RandomBlock className='rounded'>
				<Title>{ }</Title>
				<ListGroup flush>
					<ListGroupItem className='d-flex justify-content-between'>
						<Term className='term'>Gender</Term>
						<span>{ }</span>
					</ListGroupItem>
					<ListGroupItem className='d-flex justify-content-between'>
						<Term className='term'>Born</Term>
						<span>{ }</span>
					</ListGroupItem>
					<ListGroupItem className='d-flex justify-content-between'>
						<Term className='term'>Died</Term>
						<span>{ }</span>
					</ListGroupItem>
					<ListGroupItem className='d-flex justify-content-between'>
						<Term className='term'>Culture</Term>
						<span>{ }</span>
					</ListGroupItem>
				</ListGroup>
			</RandomBlock>
		);
	}
}