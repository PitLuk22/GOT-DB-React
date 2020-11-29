import React from 'react';
import img from '../../img/error.gif';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
	position: relative;
	margin: 0 auto ;
	/* width: 600px;
	height: 500px; */
	border-radius: 10px;
	overflow: hidden;
	color: #fff;
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
	font-size: 25px;
	color: #000;
	text-align: center;
`;

const Btn = styled(Button)`
	position: absolute;
	bottom: 10%;
	left: 50%;
	transform: translateX(-50%);
	padding: 10px 20px;
	font-weight: bold;
	font-size: 20px;
	color: #fff;
`;

const WrongPath = () => {

	if (document.querySelector('.wrongPath')) return null;

	return (
		<>
			<Wrapper className='wrongPath'>
				<Span>You are lost!<br /> Try to return to the main page</Span>
				<Img src={img} alt="error" />
				<Btn href='/' color='primary'>Back to main page</Btn>
			</Wrapper>
		</>
	)
}
export default WrongPath;