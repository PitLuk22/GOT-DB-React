import React, { Component } from 'react';
import { Col } from 'reactstrap';

export default class RowBlock extends Component {
	render() {
		return (
			<>
				<Col md="6" lg="4">
					{this.props.random}
				</Col>
				<Col md="6" lg="8">
					{this.props.list}
				</Col>
			</>
		)
	}
}