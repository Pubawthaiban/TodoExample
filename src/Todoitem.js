import React, { Component, useRef } from "react";
import "./Todoitem.css";

export class Todoitem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editText: props.todo.title
    }

    this.editField = React.createRef();
  }

  classNames = (edit, conpleted) => {
    let classname = null;
    if (conpleted) classname = "completed";
    if (edit) classname = "editing";
    return classname;
  };

  handleEdit = (todo) => {
    this.props.onEdit(todo);
  };

  handleChange = (event) => {
    if (this.props.editing) {
      this.setState({ editText: event.target.value });
    }
  };

  handleKeyDown = (event) => {
    let ESCAPE_KEY = 27; //ESC
    let ENTER_KEY = 13; // Enter
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleSubmit = (event) => {
    let val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val, this.props.todo);
    } else {
      this.props.onDestroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      this.editField.current.focus();
    }
  }

  render() {
    const { todo, editing, onToggle, onDestroy } = this.props;
    return (
      <li className={this.classNames(editing, todo.completed)}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
          />
          <label onDoubleClick={() => this.handleEdit(todo)}>
            {todo.title}
          </label>
          <button className="destroy" onClick={() => onDestroy(todo)} />
        </div>
        <input
          className="edit"
          ref={this.editField}
          value={this.state.editText}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleSubmit}
        />
      </li>
    );
  }
}

export default Todoitem;
