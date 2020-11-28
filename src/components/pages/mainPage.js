import React, { Component } from 'react';
import { Col, Jumbotron } from 'reactstrap';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';

const H1 = styled.h1`
	font-weight: bold;
	text-align: center;
	font-size: 45px;
`;
const Paragraph = styled.p`
	text-align: center;
	font-size: 20px;
`;

const Span = styled.span`
	position: relative;
	/* padding: 2px 10px;
	background-color:#c7c7c7;
	border-radius: 5px; */
	&::after {
		content: '';
		position: absolute;
		display: block;
		bottom: -2px; 
		width: 100%;
		height: 3px;
		background-color:#007bff;
		border-radius: 5px;
	}
`;

const Link = styled.a`
	padding: 10px 20px;
	background-color: #007bff;
	border-radius: 5px;
	&:hover {
		background-color:#0262c9;
	}
`;
export default class MainPage extends Component {

	state = {
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	render() {

		if (this.state.error) {
			return (
				<ErrorMessage />
			)
		}

		return (
			<>
				<Col md={{ size: 6, offset: 3 }} lg={{ size: 8, offset: 2 }}>
					<Jumbotron>
						<H1>Welcome to Game Of Thone DB</H1>
						<Paragraph>Here you can see various information about the Game of Thrones universe.</Paragraph>
						<hr />
						<Paragraph>For example, you can find out the year of birth, the date of death and the culture of which this or that <Span>character</Span> of the universe was an adherent, or you can get acquainted with the <Span>books</Span>, its authors and the number of pages in them, the <Span>houses</Span> of the great families of Game of Thrones are available to you. Please enjoy!</Paragraph>
						<Paragraph style={{ color: '#fff', marginTop: '30px' }}>
							<Link href='https://anapioficeandfire.com/' target="_blank" rel='noreferrer' color="primary">Show more about this API</Link>
						</Paragraph>
					</Jumbotron>
				</Col>
			</>
		)
	}
}