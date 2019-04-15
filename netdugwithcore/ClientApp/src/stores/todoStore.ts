import { observable, action, computed } from 'mobx';
import Todo from '../types/todo';
import uuid from 'uuid';

export interface ITodoStore {
    loading: boolean;
    todoList: Todo[];
    loadTodoes(): any;
    createTodo(): void;
    deleteTodo(todo: Todo): void;
    updateTodo(todo: Todo): Todo;
}

export class TodoStore {
    @observable loading = false;
    @observable todoList: Todo[] = [];




    createTodo = () => {
        const todo = new Todo(this, uuid.v4());
        todo.title = "Save this shit";
        todo.isCompleted = false;

        console.log(`New todo: ${JSON.stringify(todo)}`);
        this.todoList.push(todo);
        return todo;
    }
}