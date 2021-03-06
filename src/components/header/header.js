import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from "react-router-dom";

const HeaderBlock = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 50px;
	@media(max-width: 767px) {
		flex-direction: column;
		padding-top: 30px;
		h3 {
			margin-bottom: 30px;
		}
	}
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
		a {
			padding: 5px 15px;
			margin-right: 10px;
			font-size: 20px; 
			border-radius: 10px; 
			transition: all .3s ease;
			&:hover {
				background-color: #89bbbb;
				color: #000;
			}
		}
		.active {
			background-color: #D7FFFE;
			color: #000;
		}
	}
`;

const Header = ({ location }) => {

	const setActiveClass = (nameOfPage) => {
		return location.pathname.includes(nameOfPage) ? 'active' : '';
	}

	return (
		<>
			<HeaderBlock>
				<HeaderLogo>
					<Link to="/">
						Game of Thrones DB
					</Link>
				</HeaderLogo>
				<HeaderLinks>
					<li>
						<Link
							to="/characters/"
							className={setActiveClass('characters')}>
							Characters
						</Link>
					</li>
					<li>
						<Link
							to="/houses/"
							className={setActiveClass('houses')}>
							Houses
						</Link>
					</li>
					<li>
						<Link
							to="/books/"
							className={setActiveClass('books')}>
							Books
						</Link>
					</li>
				</HeaderLinks>
			</HeaderBlock>
		</>
	)
}

export default withRouter(Header);