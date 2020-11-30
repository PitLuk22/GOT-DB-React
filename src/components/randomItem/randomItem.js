import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import styled from 'styled-components';
import InfoSpan from '../infoSpan'
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types'

const RandomBlock = styled.div`
	position: relative;
	text-align: center;
	background-color: #fff;
	overflow: hidden;
	max-height: ${props => props.className.includes('hide') ? 0 : '500px'};
	padding: ${props => props.className.includes('hide') ? 0 : '25px'};
	margin-bottom: ${props => props.className.includes('hide') ? 0 : '20px'};
	transition: ${props => props.className.includes('hide') ? 'top 1s ease, max-height 1s, padding 1s ease, margin-bottom 1s ease .5s' : 'top 1s ease, max-height 1s .1s, padding 1s ease .1s, margin-bottom 1s ease'};
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

const Btn = styled(Button)`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
`;


export default class RandomItem extends Component {

	state = {
		item: {},
		loading: true,
		error: false,
		showRandomItem: true
	}

	static defaultProps = {
		interval: 15000
	}

	static propTypes = {
		interval: PropTypes.number
	}

	componentDidMount() {
		const { interval } = this.props;
		this.updateItem();
		this.timerId = setInterval(this.updateItem, interval);
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.state.showRandomItem !== prevState.showRandomItem) {
			this.checkRandomBlock();
		}
	}
	componentWillUnmount() {
		clearInterval(this.timerId)
	}

	toggleRandomItem = () => {
		this.setState({
			showRandomItem: !this.state.showRandomItem
		})
	}

	checkRandomBlock() {
		const { interval } = this.props;
		if (!this.state.showRandomItem) clearInterval(this.timerId);
		else this.timerId = setInterval(this.updateItem, interval);
	}

	onItemLoaded = (item) => {
		this.setState({
			item: item,
			loading: false
		})
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false
		})
	}

	updateItem = () => {
		const { range } = this.props;
		const id = Math.floor(Math.random() * range[1] + range[0]) // from 25 to 140
		// const id = 1300000;
		const { getData } = this.props;

		getData(id)
			.then(item => this.onItemLoaded(item))
			.catch(this.onError)
	}

	generateRandomKey() {
		return new Date().getTime() + Math.random();
	}

	renderItems(item, loading) {
		let arr = [];
		for (let label in item) {
			const uniqueKey = this.generateRandomKey();

			arr.push(
				<ListGroupItem key={uniqueKey} className='d-flex justify-content-between'>
					<Term className='term'>{label}</Term>
					<InfoSpan info={item[label]} load={loading} />
				</ListGroupItem>
			)
		}
		return arr;
	}

	render() {

		const classNames = this.state.showRandomItem ? 'rounded' : 'rounded hide';
		const { item, loading, error } = this.state
		const { name } = item;

		const { about, dataProcessing } = this.props;
		const title = about[0].toUpperCase() + about.slice(1);

		const obj = dataProcessing(item);
		const items = this.renderItems(obj, loading);

		if (error) {
			return (
				<>
					<RandomBlock className={classNames}>
						<ErrorMessage />
					</RandomBlock>

				</>
			)
		}

		const btnText = this.state.showRandomItem ? 'Close' : 'Open';

		return (
			<>
				<RandomBlock className={classNames}>
					<Title>Random {title}: <br /> <InfoSpan info={name} load={loading} /></Title>
					<ListGroup flush>
						{items}
					</ListGroup>
				</RandomBlock>

				<Btn
					color="primary"
					onClick={this.toggleRandomItem}>
					{btnText} random character block
				</Btn>
			</>
		)
	}
}
