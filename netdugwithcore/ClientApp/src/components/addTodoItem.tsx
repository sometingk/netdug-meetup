import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ITodoStore } from '../stores/todoStore';
import Todo from '../types/todo';

interface AddTodoItemProps {
    todoStore?: ITodoStore
};


@inject('todoStore')
@observer
class AddTodoItem extends Component<AddTodoItemProps> {
    newTodo: Todo = new Todo(this.props.todoStore!);

    render() {
        return (
            <div className="add-item">
                <label htmlFor="title">Title: </label>
                <input type="text"
                    value={this.newTodo.title}
                    onChange={this.onChange}
                />
                <button name="create-todo" onClick={this.saveHandler} >Add Todo</button>
            </div>
        )
    }

    saveHandler = (e: React.FormEvent<HTMLButtonElement>): void => {
        // save a new Todo
        e.preventDefault();
        const { createTodo } = this.props.todoStore!;
        createTodo();
    }

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.newTodo.title = e.currentTarget.value;
    }
}

export default AddTodoItem;