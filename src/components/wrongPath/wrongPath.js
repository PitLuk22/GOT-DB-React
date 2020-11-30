import React from 'react';
import img from '../../img/error.gif';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
	position: relative;
	margin: 0 auto ;
	border-radius: 10px;
	overflow: hidden;
	color: #fff;
	a {
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%);
		padding: 10px 20px;
		font-weight: bold;
		font-size: 20px;
		color: #fff;
		padding: 10px 20px;
		background-color: #007bff;
		border-radius: 5px;
		transition: all .3s ease;
		&:hover {
			background-color: #0267d3;
		}
	}
`;

const Img = styled.img`
	width: 100%;
	height: auto;
	border-radius: 10px;
	
`;

const Span = styled.span`
	position: absolute;	
	top: 5%;
	left: 50%;
	transform: translateX(-50%);
	font-weight: bold;
	font-size: 22px;
	color: #000;
	text-align: center;
`;

const WrongPath = () => {

	if (document.querySelector('.wrongPath')) return null;

	return (
		<>
			<Wrapper className='wrongPath'>
				<Span>You are lost!<br /> Try to return to the main page</Span>
				<Img src={img} alt="error" />
				<Link to='/'>Back to main page</Link>
			</Wrapper>
		</>
	)
}
export default WrongPath;