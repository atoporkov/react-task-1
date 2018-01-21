import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import autobind from 'react-autobind';

import Todo from '../Todo';
import TodoForm from '../TodoForm';

import { getTodos, addTodo, updateTodo, deleteTodo, findTodo, sortTodos } from '../../actions/todos';

import style from './style.scss';

@CSSModules(style)
class TodoList extends Component {
  constructor() {
    super();
    autobind(this);
    this.state = {
      showForm: false
    }
  }

  componentWillMount() {
    this.props.onGetTodos();
  }

  componentWillReceiveProps() {
    this.setState(
      {
        showForm: false
      }
    );
  }

  _onToggleTodoForm() {
    this.setState(
      {
        showForm: !this.state.showForm
      }
    );
  }

  _onFindTodoReset() {
    this.refs.findTodo.value = "";
    this.props.onFindTodo(null);
  }

  _onChangeSorting() {
    this.props.onSortTodos(this.refs.sorting.value);
  }

  _onFindTodo() {
    this.props.onFindTodo(this.refs.findTodo.value);
  }

  _onAddTodo(data) {
    this.props.onAddTodo(data);
  }

  _onUpdateTodo(id, data) {
    this.props.onUpdateTodo(id, data);
  }

  _onDeleteTodo(id) {
    this.props.onDeleteTodo(id);
  }

  _onShareTodo(data) {
    //TODO: share here
  }

  render() {
    return (
        <div className={style['todo-list-component']}>
            <h2 className={style['todo-list-header']}>ToDo List</h2>
            <div className="row">
              <div className="column column-10"></div>
              <div className="column column-80">
                <div className="row">
                  <div className="column column-40 find-input-container">
                    <input ref="findTodo" type="text" placeholder="Todo name here..." />
                    {this.props.todos.query ? <i title="reset" className="fa fa-remove reset-query" onClick={this._onFindTodoReset}></i> : null}
                  </div>
                  <div className="column column-20">
                    <button className="btn-ctrl" onClick={this._onFindTodo}>Find</button>
                  </div>
                  <div className="column column-20">
                    <button className="btn-ctrl" onClick={this._onToggleTodoForm}>Add</button>
                  </div>
                  <div className="column column-20">
                    <select ref="sorting" onChange={this._onChangeSorting} defaultValue="DUEDATE_DESC">
                      <option value="PRIORITY_ASC">Priority asc</option>
                      <option value="PRIORITY_DESC">Priority desc</option>
                      <option value="DUEDATE_ASC">Due date asc</option>
                      <option value="DUEDATE_DESC">Due date desc</option>
                      <option value="STARTDATE_ASC">Start date asc</option>
                      <option value="STARTDATE_DESC">Start date desc</option>
                    </select>
                  </div>
                </div>
                {
                  !this.state.showForm ? null
                    :
                    (<div className="row">
                      <div className="column column-10"></div>
                      <div className="column column-80">
                        <hr />
                        <TodoForm onSubmit={(data) => this._onAddTodo(data)} />
                      </div>
                      <div className="column column-10"></div>
                    </div>)
                }
              </div>
              <div className="column column-10"></div>
            </div>
            <div className={style['list-wrapper']}>
              <ul className={style['list']}>
                {
                  this.props.todos.data.map(todo =>
                    <li className={!todo.isActive ? 'todo-inactive' : ''} key={todo.id}><Todo {...todo} onTodoShared={(data) => this._onShareTodo(data)}
                      onTodoUpdated={(id, data) => this._onUpdateTodo(id, data)} onTodoDeleted={(id) => this._onDeleteTodo(id)} /></li>
                  )
                }
              </ul>
            </div>
        </div>
    );
  }
}

let sortFunc = (type) => {
  switch(type) {
    case 'PRIORITY_ASC':
      return (a, b) => a.priority - b.priority;
    break;
    case 'PRIORITY_DESC':
      return (a, b) => b.priority - a.priority;
    break;
    case 'DUEDATE_ASC':
      return (a, b) => a.dueDate - b.dueDate;
    break;
    case 'DUEDATE_DESC':
      return (a, b) => b.dueDate - a.dueDate;
    break;
    case 'STARTDATE_ASC':
      return (a, b) => a.startDate - b.startDate;
    break;
    case 'STARTDATE_DESC':
      return (a, b) => b.startDate - a.startDate;
    break;
  }
}

let mapStateToProps = ({todos}) => {
    let filterTodos = (todos, query) => todos.filter(todo => todo.title.includes(query));

    let _todos = !todos.query ? todos : {...todos, data: filterTodos(todos.data,todos.query)};

    return {
        todos: {...todos, data: _todos.data.sort(sortFunc(todos.sorting))}
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onGetTodos: () => {
            dispatch(getTodos());
        },
        onAddTodo: (data) => {
            dispatch(addTodo(data));
        },
        onFindTodo: (title) => {
            dispatch(findTodo(title));
        },
        onUpdateTodo: (id ,data) => {
            dispatch(updateTodo(id, data));
        },
        onDeleteTodo: (id) => {
            dispatch(deleteTodo(id));
        },
        onSortTodos: (type) => {
            dispatch(sortTodos(type));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
