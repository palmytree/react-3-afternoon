import React, { Component } from 'react';
import ProfileIcon from 'react-icons/lib/md/person-outline';

import './Compose.css';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Compose extends Component {
  constructor() {
    super();
    
    this.state = {
      text: ''
    };

    this.createPost = this.createPost.bind( this );
  }

  updateText( text ) {
    this.setState({ text });
  }

  createPost() {
    const { createPostFn } = this.props
    const { text } = this.state
    const output = { 'text': text }
    createPostFn( output )
    this.setState({text: ''})
  }

  render() {
    // Destructuring
    const { text } = this.state;

    return (
      <section className="Compose__parent">
        <div className="Compose__top">

          <div className="Compose__profile-picture">
            <ProfileIcon />
          </div>

          {/* This is where you type the message for your new post */}
          <input className="Compose__input"
                 placeholder="What's on your mind?"
                 value={ text }
            onChange={ ( e ) => this.updateText( e.target.value ) }
            onKeyPress={e => e.key === 'Enter' && this.createPost({ 'text': e.target.value})}
          />

        </div>

        <div className="Compose__bottom">
          <button onClick={ this.createPost }>Compose</button>
        </div>
      </section>
    )
  }
}