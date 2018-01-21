import axios from 'axios';

import APP_CONFIG from '../config';

export const   FETCH_TODOS_FULFILLED = 'FETCH_TODOS_FULFILLED',
               FETCH_TODOS_REJECTED = 'FETCH_TODOS_REJECTED',
               FETCH_TODOS_BY_QUERY = 'FETCH_TODOS_BY_QUERY';

export const getTodos = () =>
    dispatch => {
        axios
            .get(`${APP_CONFIG['api']['host']}:${APP_CONFIG['api']['port']}/todos`)
                .then(
                    response => {
                        dispatch(
                            {
                                type: FETCH_TODOS_FULFILLED,
                                payload: response.data
                            }
                        );
                    }
                )
                .catch(error => {
                    dispatch(
                        {
                            type: FETCH_TODOS_REJECTED,
                            payload: error
                        }
                    );
                })
    }


export const addTodo = (data) =>
    dispatch => {
        axios
            .post(`${APP_CONFIG['api']['host']}:${APP_CONFIG['api']['port']}/todos`, data)
                .then(
                    response => {
                        dispatch(
                            {
                                type: FETCH_TODOS_FULFILLED,
                                payload: response.data
                            }
                        );
                    }
                )
                .catch(error => {
                    dispatch(
                        {
                            type: FETCH_TODOS_REJECTED,
                            payload: error
                        }
                    );
                })
    }

export const updateTodo = (id, data) =>
    dispatch => {
        axios
            .put(`${APP_CONFIG['api']['host']}:${APP_CONFIG['api']['port']}/todos/${id}`, data)
                .then(
                    response => {
                        dispatch(
                            {
                                type: FETCH_TODOS_FULFILLED,
                                payload: response.data
                            }
                        );
                    }
                )
                .catch(error => {
                    dispatch(
                        {
                            type: FETCH_TODOS_REJECTED,
                            payload: error
                        }
                    );
                })
    }

export const deleteTodo = (id) =>
    dispatch => {
        axios
            .delete(`${APP_CONFIG['api']['host']}:${APP_CONFIG['api']['port']}/todos/${id}`)
                .then(
                    response => {
                        dispatch(
                            {
                                type: FETCH_TODOS_FULFILLED
                            }
                        );
                    }
                )
                .catch(error => {
                    dispatch(
                        {
                            type: FETCH_TODOS_REJECTED,
                            payload: error
                        }
                    );
                })
    }

export const findTodo = (payload) =>
    dispatch =>
        dispatch({
            type: FETCH_TODOS_BY_QUERY,
            payload
        });
