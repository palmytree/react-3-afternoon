import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
	constructor() {
		super();

		this.state = {
			searchText: ''
		};

		this.updateText = this.updateText.bind(this);
	}

	updateText(e) {
		this.setState({ searchText: e.target.value });
	}

	render() {
		
		return (
			<section className='Search__parent'>
				<div className='Search__content'>
					<input
						placeholder='Search Your Feed'
						onChange={e => {
              this.updateText( e );
              console.log(e)
              if ( e.target.value === '' ) {
                this.props.resetPostsFn()
                return
              }
              this.props.filterPostsFn( e.target.value )
						}}
					/>

					<SearchIcon
						id='Search__icon'
						onClick={() => this.props.filterPostsFn(this.state.searchText)}
					/>
				</div>
			</section>
		);
	}
}
