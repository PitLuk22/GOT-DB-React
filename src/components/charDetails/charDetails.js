import { React, Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import GotService from '../../services/gotService';
import InfoSpan from '../infoSpan'
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';


const Block = styled.div`
	background-color: #fff;
    padding: 25px;
	margin-bottom: 40px;
	font-size: 16px;
	&:hover span i{
		animation: arrow .8s ease-in-out infinite;
	}
	span {
		font-size: 16px;
		i {
			display: inline-block;
			font-size: 25px;
			transition: all .3s ease;
		}
	}
	@keyframes arrow {
 		0% {transform: translateX(0);}
 		50% {transform: translateX( -10px);}
 		100% {transform: translateX( 0);}
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


export default class CharDetails extends Component {

	got = new GotService();

	state = {
		char: null,
		loading: true,
		error: false
	}

	componentDidMount() {
		this.getChar();
	}
	componentDidUpdate(prevProps) {
		if (this.props.selectedCharID !== prevProps.selectedCharID) {
			this.getChar();
		}
	}
	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	getChar = () => {
		if (!this.props.selectedCharID) {
			return;
		}
		this.setState({ loading: true })

		const { selectedCharID } = this.props;

		this.got.getCharacter(selectedCharID)
			.then(char => this.setState({
				char: char,
				loading: false
			}))
			.catch()
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

		// arrow or Spinner
		if (!this.state.char) {
			const spinner = !this.props.selectedCharID ? <i>&larr;</i> : <Spinner />;
			return (
				<Block className='rounded'>
					<span>{spinner} Please, select a character!</span>
				</Block>
			)
		}

		// Correct info about certain character
		const { char: { name, gender, born, died, culture }, loading } = this.state;
		return (
			<Block className='rounded'>
				<Title><InfoSpan info={name} load={loading} /></Title>
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
			</Block>
		);



	}
}

