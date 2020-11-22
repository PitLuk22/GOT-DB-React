import { React, Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const RandomBlock = styled.div`
	text-align: center;
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	margin-bottom: 20px;
`;

const Title = styled.h4`
	margin-bottom: 20px;
	text-align: center;
	font-size: 18px; 
	span{
		font-weight: bold;
		font-size: 24px; 
	}
`;

const Term = styled.span`
	font-weight: bold;
`;

export default class RandomChar extends Component {

	state = {
		char: {},
		loading: true,
		error: false
	}

	componentDidMount() {
		this.updateChar();
		// this.timerId = setInterval(this.updateChar, 1500);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	onCharLoaded = (char) => {
		this.setState({
			char: char,
			loading: false
		})
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false
		})
	}

	updateChar = () => {
		const id = Math.floor(Math.random() * 140 + 25) // from 25 to 140
		// const id = 1300000;
		const got = new GotService();
		got.getCharacter(id)
			.then(char => this.onCharLoaded(char))
			.catch(this.onError)
	}


	render() {
		const { char: { name, gender, born, died, culture }, loading, error } = this.state;

		if (error) {
			return (
				<>
					<RandomBlock className='rounded'>
						<ErrorMessage />
					</RandomBlock>

				</>
			)
		}

		return (
			<RandomBlock className='rounded'>
				<Title>Random Character: <br /> <InfoSpan info={name} load={loading} /></Title>
				<ListGroup flush>
					<ListGroupItem className='d-flex justify-content-between'>
						<Term className='term'>Gender</Term>
						<InfoSpan info={gender} load={loading} />
					</ListGroupItem>
					<ListGroupItem className='d-flex justify-content-between'>
						<Term className='term'>Born</Term>
						<InfoSpan info={born} load={loading} />
					</ListGroupItem>
					<ListGroupItem className='d-flex justify-content-between'>
						<Term className='term'>Died</Term>
						<InfoSpan info={died} load={loading} />
					</ListGroupItem>
					<ListGroupItem className='d-flex justify-content-between'>
						<Term className='term'>Culture</Term>
						<InfoSpan info={culture} load={loading} />
					</ListGroupItem>
				</ListGroup>
			</RandomBlock>
		)
	}
}

const InfoSpan = ({ info, load }) => {

	info = info === '' ? info = 'no info :(' : info;
	const spinner = load ? <Spinner /> : info;

	return (
		<>
			<span>{spinner}</span>
		</>
	)
}

