import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  auth,
  deletePost,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => (
  <div className='post bg-white my-1 p-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-image' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1 text-in-post'>{text}</p>
      <p className='my-1 text-in-post'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {showActions && (
        <Fragment>
          <button onClick={(e) => addLike(_id)} className='button'>
            <i className='fas fa-thumbs-up text-success'></i>{' '}
            <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button onClick={(e) => removeLike(_id)} className='button'>
            <i className='fas fa-thumbs-down text-danger'></i>
          </button>
          <Link to={`/posts/${_id}`} className='button button-primary my-1'>
            Discussion{' '}
            {comments.length > 0 && <span> ({comments.length})</span>}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='button button-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
