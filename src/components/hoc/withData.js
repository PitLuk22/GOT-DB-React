import React, { Component } from 'react'
import GotService from '../../services/gotService';


function withData(View, getDataAll) {
	class WithData extends Component {
		constructor(props) {
			super(props)
			this.booksListPage = false;
			console.log(View);
			console.log('-------------------------');
			console.log(getDataAll);
		}

		got = new GotService();

		state = {
			itemList: null
		}

		componentDidMount() {
			this.onUpdateList();
		}

		setBookslistNumber(boolean) {
			this.booksListPage = !boolean;
			return this.booksListPage ? 1 : 2;
		}

		onUpdateList = () => {

			let numberOfPage = this.props.about.includes('books') ? this.setBookslistNumber(this.booksListPage) : Math.floor(Math.random() * 40 + 5);

			// Change state for Spinner
			this.setState({ itemList: null });

			// const { getDataAll } = this.props;
			getDataAll(numberOfPage)
				.then((itemList) => {
					this.setState({ itemList })
				});
		}

		render() {
			const { itemList } = this.state;
			// const arr = this.state.itemList;

			return <View {...this.props} data={itemList} onUpdate={this.onUpdateList} />
		}
	}
	WithData.displayName = `WithData(${View.displayName || View.name || 'Component'})`;

	return WithData;
}


export default withData;