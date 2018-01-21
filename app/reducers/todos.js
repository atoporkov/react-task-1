import { FETCH_TODOS_FULFILLED, FETCH_TODOS_REJECTED, FETCH_TODOS_BY_QUERY } from '../actions/todos';

export default function todos (state = {
	data: [],
	query: null,
	error: null
}, action) {
	switch(action.type){
		case FETCH_TODOS_FULFILLED: {
			return {...state, data: action.payload}
		}
		case FETCH_TODOS_REJECTED: {
			return {...state, error: action.payload}
		}
		case FETCH_TODOS_BY_QUERY: {
			return {...state, query: action.payload ? action.payload : null}
		}
		default:{
			return state;
		}
	}
}
