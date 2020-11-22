import React from 'react';
import img from './error.gif';
import styled from 'styled-components';

const Img = styled.img`
	margin-bottom: 10px;
`;

const Span = styled.span`
	font-weight: bold;
	font-size: 20px;
`;


const ErrorMessage = () => {
	return (
		<>
			<Img src={img} alt="error" />
			<Span>Something went wrong!</Span>
		</>
	)
}

export default ErrorMessage;