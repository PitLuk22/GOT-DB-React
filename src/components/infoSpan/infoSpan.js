import React from 'react';
import Spinner from '../spinner'
import styled from 'styled-components';

const Span = styled.span`
	max-width: 150px;
	text-align: right;
	word-wrap: break-word;
`;

const InfoSpan = ({ info, load }) => {

	info = info === '' ? info = 'no info :(' : info;
	const spinner = load ? <Spinner /> : info;

	return (
		<>
			<Span className='information'>{spinner}</Span>
		</>
	)
}

export default InfoSpan;