import React, { Component } from "react";

import { ACTIVE_TODOS, COMPLETED_TODOS } from "./service";
import Todoitem from "./Todoitem";

class todoItems extends Component {
  render() {
    let {
      todos,
      nowShowing,
      editing,
      onToggle,
      onDestroy,
      onEdit,
      onCancel,
      onSave
    } = this.props;
    let items = null;

    let filer_item = todos.filter((item) => {
      switch (nowShowing) {
        case ACTIVE_TODOS:
          return !item.completed;
        case COMPLETED_TODOS:
          return item.completed;
        default:
          return true;
      }
    });

    if (!!filer_item) {
      items = filer_item.map((item) => {
        return (
          <Todoitem
            key={item.id}
            todo={item}
            editing={editing === item.id}
            onToggle={onToggle}
            onDestroy={onDestroy}
            onEdit={onEdit}
            onCancel={onCancel}
            onSave={onSave}
          />
        );
      });
    }

    return <React.Fragment>{items}</React.Fragment>;
  }
}

export default todoItems;
