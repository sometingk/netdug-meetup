import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ITodoStore } from '../stores/todoStore';
import Todo  from '../types/todo';
import { TodoItem } from './todoItem';
import AddTodoItem from './addTodoItem';

interface TodoListProps {
    todoStore?: ITodoStore
};

@inject('todoStore')
@observer
class TodoList extends Component<TodoListProps> {
    render() {
        console.log(`props: ${JSON.stringify(this.props)}`);
        const { todoList } = this.props.todoStore!;
        return (
            <div>
                {todoList && todoList.map((todo: Todo, key:any ) => {
                    <TodoItem todo={todo} />
                })}
                <AddTodoItem />
            </div>
        )
    }
}

export default TodoList;