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

    // default state
    this.state = {
      showForm: false
    }
  }

  // converting timestamp to user-friendly date
  _getDate(date) {
    let d = new Date(date * 1000);
    return (d.getMonth() < 9 ? '0'+(d.getMonth()+1) : (d.getMonth()+1))+'/'+(d.getDate() < 9 ? '0'+d.getDate() : d.getDate())+'/'+d.getFullYear();
  }

  // priority color
  _getColor() {
    return APP_CONFIG['todo']['priority'][this.props.priority]['color'];
  }

  // priority name
  _getPriority() {
    return APP_CONFIG['todo']['priority'][this.props.priority]['name'];
  }

  // toggle form visibility
  _toggleEditForm() {
    this.setState(
      {
        showForm: !this.state.showForm
      }
    );
  }

  // listen to form submit
  _onEditTodo(data) {
    this.props.onTodoUpdated(this.props.id, data);
    this._toggleEditForm();
  }

  // handle Todo delete and pass ID to list
  _onDeleteTodo() {
    this.props.onTodoDeleted(this.props.id);
  }

  // handle Todo share and pass ID to list
  _onShareTodo() {
    this.props.onTodoShared(this.props.id);
  }

  // handle Todo status changed
  _onChecked(e) {
    this.props.onTodoUpdated(this.props.id, {...this.props, isActive: !this.props.isActive});
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
                <i className="fa fa-pencil ctrl-icon" style={{color: this.state.showForm ? '#9b4dca' : ''}} title="edit" onClick={this._toggleEditForm}></i>
                <i className="fa fa-remove ctrl-icon" title="delete" onClick={this._onDeleteTodo}></i>
                <i className="fa fa-share-alt ctrl-icon" title="share" onClick={this._onShareTodo}></i>
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
                  <TodoForm formHeader={"Edit ToDo"} {...this.props} onCancel={this._toggleEditForm} onSubmit={(data) => this._onEditTodo(data)} />
                </div>
                <div className="column column-10"></div>
              </div>)
          }
        </div>
    );
  }
}

export default Todo;
