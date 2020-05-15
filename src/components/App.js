import React, { Component } from 'react';
import Post from './Post/Post';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
	constructor() {
		super();

		this.state = {
			posts: []
		};

		this.updatePost = this.updatePost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.createPost = this.createPost.bind(this);
		this.filterPosts = this.filterPosts.bind(this);
		this.resetPosts = this.resetPosts.bind(this);
	}

	componentDidMount() {
		axios
			.get('https://practiceapi.devmountain.com/api/posts')
			.then(res => this.setState({ posts: res.data }))
			.catch(err => console.log(err));
	}

	resetPosts() {
		axios
			.get('https://practiceapi.devmountain.com/api/posts')
			.then(res => this.setState({ posts: res.data }))
			.catch(err => console.log(err));
	}

	updatePost(id, textObj) {
		axios
			.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, textObj)
			.then(res => this.setState({ posts: res.data }))
			.catch(err => console.log(err));
	}

	deletePost(id) {
		axios
			.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
			.then(res => this.setState({ posts: res.data }))
			.catch(err => console.log(err));
	}

	createPost(textObj) {
		axios
			.post(`https://practiceapi.devmountain.com/api/posts`, textObj)
			.then(res => this.setState({ posts: res.data }))
			.catch(err => console.log(err));
	}

	filterPosts(textToFilter) {
		axios
			.get(
				`https://practiceapi.devmountain.com/api/posts/filter?text=${encodeURI(
					textToFilter
				)}`
			)
			.then(res => this.setState({ posts: res.data }))
			.catch(err => console.log(err));
	}

	render() {
		const { posts } = this.state;

		return (
			<div className='App__parent'>
				<Header
					filterPostsFn={this.filterPosts}
					resetPostsFn={this.resetPosts}
				/>

				<section className='App__content'>
					<Compose createPostFn={this.createPost} />
					{posts.map((e, i) => (
						<Post
							key={i}
							text={e.text}
							date={e.date}
							id={e.id}
							updatePostFn={this.updatePost}
							deletePostFn={this.deletePost}
						/>
					))}
				</section>
			</div>
		);
	}
}

export default App;
