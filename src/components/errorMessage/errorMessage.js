import React from 'react';
import img from '../../img/error.gif';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const Img = styled.img`
	width: 100%;
	height: auto;
	border-radius: 10px;
`;

const Span = styled.span`
	text-align: center;
	font-weight: bold;
	font-size: 20px;
	color: #000;
`;



const ErrorMessage = () => {
	return (
		<>
			<Span>Something went wrong!</Span>
			<Img src={img} alt="error" />
		</>
	)
}

export default ErrorMessage;