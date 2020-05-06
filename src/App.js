import React, { Component } from "react";
import logo from "./logo.svg";
// import "./base.css";

import "./App.css";

import { uuid, ALL_TODOS } from "./service";
import Todoitems from "./TodoItems";
import Footer from "./footer";

class App extends Component {
  state = {
    nowShowing: ALL_TODOS,
    editing: null,
    newTodo: "",
    todos: [],
    checked: false,
    TodoCount: 0,
  };

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== 13) {
      return;
    }

    event.preventDefault();

    let val = this.state.newTodo.trim();

    if (val) {
      let lisTodo = {
        id: uuid(),
        title: val,
        completed: false,
      };

      this.state.todos.unshift(lisTodo);

      this.setState({ todos: this.state.todos, newTodo: "" });
      console.log(this.state.todos);
      this.activeTodoCount();
    }
  };

  handleChang = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  toggleAll = (event) => {
    if (this.state.todos.length) {
      let checked = event.target.checked;
      this.state.todos.map((item) => {
        return (item.completed = checked);
      });
      this.setState({
        checked: checked,
      });
    }
  };

  activeTodoCount = () => {
    let count_completed, completed_status;
    count_completed = this.state.todos.reduce((sum, todo) => {
      return todo.completed ? sum : sum + 1;
    }, 0);

    if (this.state.todos.length) {
      if (count_completed === 0) {
        completed_status = true;
      } else {
        completed_status = false;
      }
    } else {
      completed_status = false;
    }

    this.setState({
      TodoCount: count_completed,
      checked: completed_status,
    });
  };

  toggle = (todoTotoggle) => {
    let todo = this.state.todos.find((item) => item === todoTotoggle);
    todo.completed = !todo.completed;
    this.setState({
      todos: this.state.todos,
    });
    this.activeTodoCount();
  };

  Destroy = (todo) => {
    let index = this.state.todos.indexOf(todo);
    this.state.todos.splice(index, 1);
    this.setState({
      todos: this.state.todos,
    });
    this.activeTodoCount();
  };

  edit = (todo) => {
    this.setState({ editing: todo.id });
  };

  cancel = () => {
    this.setState({ editing: null });
  }

  save = (val, todo) => {
    let todos = this.state.todos.find((item) => item === todo);
    todos.title = val;
    this.setState({
      editing: null,
      todos: this.state.todos
    });
  }

  completedCount = () => {
    return this.state.todos.length - this.state.TodoCount
  }

  render() {
    return (
      <div className="todoapp">
        <header className="header">
          <h1>Todo Example</h1>
          <input
            className="new-todo"
            placeholder=""
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChang}
            autoFocus={true}
          />
        </header>

        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={this.state.checked}
          />
          <label htmlFor="toggle-all" />
        </section>

        <ul className="todo-list">
          <Todoitems
            todos={this.state.todos}
            nowShowing={this.state.nowShowing}
            onToggle={this.toggle}
            onDestroy={this.Destroy}
            editing={this.state.editing}
            onEdit={this.edit}
            onCancel={this.cancel}
            onSave={this.save}
          />
        </ul>
        <Footer count={this.state.TodoCount} completedCount={this.completedCount()} />
      </div>
    );
  }
}

export default App;
