import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ITodoStore } from '../stores/todoStore';
import Todo from '../types/todo';
import { Animal } from '../types/animal';

interface AddTodoItemProps {
    todoStore?: ITodoStore
};


@inject('todoStore')
@observer
class AddTodoItem extends Component<AddTodoItemProps> {
    //newTodo: Todo = new Todo(this.props.todoStore!, "test again");
    

    render() {
        return (
            <div className="add-item">
                <label htmlFor="title">Title: </label>
                <input type="text"
                    onChange={this.onChange}
                />
                <button name="create-todo" onClick={this.saveHandler} >Add Todo</button>
            </div>
        )
    }

    saveHandler = (e: React.FormEvent<HTMLButtonElement>): void => {
        // save a new Todo
        e.preventDefault();
        this.props.todoStore!.createTodo();
    }

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    }
}

export default AddTodoItem;