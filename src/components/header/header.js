import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 50px;
`;

const HeaderLogo = styled.h3`
	font-size: 24px;
	color: #fff;
	margin: 0;
`;

const HeaderLinks = styled.ul`
	display: flex;
	align-items: center;
	margin-bottom: 0;
	list-style-type: none;
	color: #fff;
	li {
		margin-right: 30px;
		font-size: 20px; 
	}
`;

const Header = () => {
	return (
		<>
			<HeaderBlock>
				<HeaderLogo>
					<a href="#">
						Game of Thrones DB
					</a>
				</HeaderLogo>
				<HeaderLinks>
					<li>
						<a href="#">Characters</a>
					</li>
					<li>
						<a href="#">Houses</a>
					</li>
					<li>
						<a href="#">Books</a>
					</li>
				</HeaderLinks>
			</HeaderBlock>
		</>
	)
}

export default Header;