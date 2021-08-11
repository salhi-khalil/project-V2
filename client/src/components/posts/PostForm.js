import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [ text, setText] = useState('');
    return (
        <div className="post-form">
        <div className="top">
            <div className="post-form-header bg-primary">
                <h4> Say something...  </h4>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                 addPost({ text });
                 setText('');
                }}>
                <textarea 
                    name = "text"
                    cols="50" 
                    rows="8" 
                    placeholder=" Create a post" 
                    value={text}
                    required 
                    onChange={e => setText(e.target.value)}> 
                </textarea>
                <input type="submit" value="Submit" className="button button-dark my-1"/>
            </form>
        </div>
     
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm);
