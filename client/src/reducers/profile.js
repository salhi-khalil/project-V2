import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
    

}

export default function(state = initialState, action) {
    const { type, payload, doctor } = action;


    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                doctor
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
                doctor
            };

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null,
                doctor
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false ,
                doctor       
            }
        default:
            return state;
    }
}