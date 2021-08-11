import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    //REGISTER_FAIL,
    GET_POST
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {},
    doctor: localStorage.getItem('doctor')

    
}

export default function(state = initialState, action){
    const { type, payload} = action;

    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
                doctor: localStorage.getItem('doctor')
                
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading:false,
                doctor: localStorage.getItem('doctor')

            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false,
                doctor: localStorage.getItem('doctor')
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false,
                doctor: localStorage.getItem('doctor')
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                doctor: localStorage.getItem('doctor')

            };
        case UPDATE_LIKES: 
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? 
                    {...post, likes: payload.likes} : post),
                loading: false,
                doctor: localStorage.getItem('doctor')

            };
        case ADD_COMMENT: 
            return {
                ...state,
                post: { ...state.post, comments: payload},
                loading: false,
                doctor: localStorage.getItem('doctor')

            }
        case REMOVE_COMMENT:
            return{
                ...state,
                post: { ...state.post, 
                    comments: state.post.comments.filter(comment => comment._id !== payload)},
                loading: false,
                doctor: localStorage.getItem('doctor')

            }

        default:
            return state;
    }
}