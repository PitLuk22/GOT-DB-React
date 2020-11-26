import React from 'react';
import Spinner from '../spinner'

const InfoSpan = ({ info, load }) => {

	info = info === '' ? info = 'no info :(' : info;
	const spinner = load ? <Spinner /> : info;

	return (
		<>
			<span style={{ textAlign: 'right', maxWidth: '150px', wordWrap: 'break-word' }}>{spinner}</span>
		</>
	)
}

export default InfoSpan;