import React from 'react';
import Spinner from '../spinner'

const InfoSpan = ({ info, load }) => {

	info = info === '' ? info = 'no info :(' : info;
	const spinner = load ? <Spinner /> : info;

	return (
		<>
			<span>{spinner}</span>
		</>
	)
}

export default InfoSpan;