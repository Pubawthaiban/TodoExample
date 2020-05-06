import React, { Component } from 'react'

class footer extends Component {
    render() {

        const { count, completedCount } = this.props;
        console.log(completedCount);
        let activeTodoWord = () => {
            return "Item";
        }

        var clearButton = null;
        if (completedCount > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}>
                    Clear completed
                </button>
            );
        }

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{count}</strong> {activeTodoWord()} left
				</span>
                {clearButton}
            </footer>
        )
    }
}

export default footer
