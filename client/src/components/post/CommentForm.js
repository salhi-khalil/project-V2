import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({  postId, addComment}) => {
    const [text, setText] = useState('');
    return (

        <div className="post-form">
        <div className="top">
            <div className="post-form-header bg-primary">
                <h4> Leave a comment... </h4>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                 addComment(postId, { text });
                 setText('');
                }}>
                <textarea 
                    name = "text"
                    cols="50" 
                    rows="8" 
                    placeholder=" Leave a comment" 
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

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment }) (CommentForm);
