import { React, Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import InfoSpan from '../infoSpan'
import ErrorMessage from '../errorMessage/errorMessage';
import './randomChar';

const RandomBlock = styled.div`
	position: relative;
	text-align: center;
	background-color: #fff;
	overflow: hidden;
	height: ${props => props.className.includes('hide') ? 0 : '300px'};
	padding: ${props => props.className.includes('hide') ? 0 : '25px'};
	margin-bottom: ${props => props.className.includes('hide') ? 0 : '20px'};
	transition: ${props => props.className.includes('hide') ? 'height 1s ease, padding 1s ease, margin-bottom 1s ease .5s' : 'height 1s ease .1s, padding 1s ease .1s, margin-bottom 1s ease'};
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
		error: false,
		showRandomChar: true
	}

	componentDidMount() {
		this.updateChar();
		// this.timerId = setInterval(this.updateChar, 10000);
	}
	componentDidUpdate(prevProps) {
		if (this.props.showHide !== prevProps.showHide) {
			this.showRandomChar();
		}
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	showRandomChar() {
		this.setState({
			showRandomChar: this.props.showHide
		})
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

		const classNames = this.state.showRandomChar ? 'rounded' : 'rounded hide';

		const { char: { name, gender, born, died, culture }, loading, error } = this.state;

		if (error) {
			return (
				<>
					<RandomBlock className={classNames}>
						<ErrorMessage />
					</RandomBlock>

				</>
			)
		}

		return (
			<RandomBlock className={classNames}>
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

// const InfoSpan = ({ info, load }) => {

// 	info = info === '' ? info = 'no info :(' : info;
// 	const spinner = load ? <Spinner /> : info;

// 	return (
// 		<>
// 			<span>{spinner}</span>
// 		</>
// 	)
// }
// export { InfoSpan };

