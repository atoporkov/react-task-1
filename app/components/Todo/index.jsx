import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import autobind from 'react-autobind';

import APP_CONFIG from '../../config';

import TodoForm from '../TodoForm';

import style from './style.scss';

@CSSModules(style)
class Todo extends Component {
  constructor() {
    super();
    autobind(this);

    this.state = {
      showForm: false
    }
  }

  _getDate(date) {
    let d = new Date(date * 1000);
    return (d.getMonth() < 9 ? '0'+(d.getMonth()+1) : (d.getMonth()+1))+'/'+(d.getDate() < 9 ? '0'+d.getDate() : d.getDate())+'/'+d.getFullYear();
  }

  _getColor() {
    return APP_CONFIG['todo']['priority'][this.props.priority]['color'];
  }

  _getPriority() {
    return APP_CONFIG['todo']['priority'][this.props.priority]['name'];
  }

  _toggleEditForm() {
    this.setState(
      {
        showForm: !this.state.showForm
      }
    );
  }

  _onEditTodo(data) {
    this.props.onTodoUpdated(this.props.id, data);
    this._toggleEditForm();
  }

  _onDeleteTodo() {
    this.props.onTodoDeleted(this.props.id);
  }

  _onChecked(e) {
    this.props.onTodoUpdated(this.props.id, {isDone: !this.props.isDone});
  }

  render() {
    return (
        <div className={style['todo-component']}>
          <div className="row">
            <div className="column column-30">
                <input type="checkbox" checked={this.props.isActive} onChange={this._onChecked}/>
                <span className={style['todo-title']}>{this.props.title}</span>
                <p>Priority: <span className={style['todo-priority']} style={{color: this._getColor()}}>{this._getPriority()}</span></p>
            </div>
            <div className="column column-40">{this.props.descr}</div>
            <div className="column column-20">
                <div className="row">
                  <div className="column">Start date: {this._getDate(this.props.startDate)}</div>
                </div>
                <div className="row">
                  <div className="column">Due date: {this._getDate(this.props.dueDate)}</div>
                </div>
            </div>
            <div className={`column column-10 ${style['ctrl-container']}`}>
              <div className="row">
                <i className="fa fa-pencil ctrl-icon" title="edit" onClick={this._toggleEditForm}></i>
                <i className="fa fa-remove ctrl-icon" title="delete" onClick={this._onDeleteTodo}></i>
              </div>
            </div>
          </div>
          {
            !this.state.showForm ? null
              :
              (<div className="row">
                <div className="column column-10"></div>
                <div className="column column-80">
                  <hr/>
                  <TodoForm {...this.props} onSubmit={(data) => this._onEditTodo(data)} />
                </div>
                <div className="column column-10"></div>
              </div>)
          }
        </div>
    );
  }
}

export default Todo;
