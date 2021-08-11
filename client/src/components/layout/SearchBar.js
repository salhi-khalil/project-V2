import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchLogs } from '../../actions/auth';

const SearchBar = ({ 
  searchLogs, 


 }) => {
  const text = useRef('');

  const onChange = e => {
    searchLogs(text.current.value);
    
  };

  return (
    <nav  className='greenSearch'>
        <div className="search p-1">
          <input 
            type="search" 
            className="search-box"
            placeholder='Search..'
            ref={text}
            onChange={onChange}
            />
            <span className="search-button">
              <span className="search-icon"></span>
            </span>
        </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchLogs }
)(SearchBar);


