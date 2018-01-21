import { FETCH_TODOS_FULFILLED_GET, FETCH_TODOS_FULFILLED_DELETE, FETCH_TODOS_FULFILLED_PUT, FETCH_TODOS_FULFILLED_POST,
	 FETCH_TODOS_REJECTED, FETCH_TODOS_BY_QUERY, FETCH_TODOS_SORTING } from '../actions/todos';

export default function todos (state = {
	data: [],
	query: null,
	sorting: 'DUEDATE_DESC',
	error: null
}, action) {
	switch(action.type){
		// dispatching todos fetch
		case FETCH_TODOS_FULFILLED_GET: {
			return {...state, data: action.payload}
		}
		// dispatching todo create
		case FETCH_TODOS_FULFILLED_POST: {
			return {...state, data: [...state.data, action.payload]};
		}
		// dispatching todo update
		case FETCH_TODOS_FULFILLED_PUT: {
			return {...state, data: [...state.data.filter(item => item.id != action.payload.id), action.payload]};
		}
		// dispatching todo delete
		case FETCH_TODOS_FULFILLED_DELETE: {
			return {...state, data: state.data.filter(item => item.id != action.payload)};
		}
		// dispatching common error
		case FETCH_TODOS_REJECTED: {
			return {...state, error: action.payload}
		}
		// dispatching todo search
		case FETCH_TODOS_BY_QUERY: {
			return {...state, query: action.payload ? action.payload : null}
		}
		// dispatching todo sort
		case FETCH_TODOS_SORTING: {
			return {...state, sorting: action.payload ? action.payload : 'DUEDATE_DESC'}
		}
		default: {
			return state;
		}
	}
}
