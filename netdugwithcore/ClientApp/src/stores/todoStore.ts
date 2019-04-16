import { observable, action, computed } from 'mobx';
import Todo from '../types/todo';
import uuid from 'uuid';
import axios from 'axios';

export interface ITodoStore {
    loading: boolean;
    todoList: Todo[];
    loadTodoes(): any;
    createTodo(): void;
    deleteTodo(todo: Todo): void;
    updateTodo(todo: Todo): Todo;
}

export class TodoStore {
    @observable todos = Array<Todo>();
    @observable isLoading = true;

    constructor() {
        
        //this.transportLayer.onReceiveTodoUpdate(updatedTodo => this.updateTodoFromServer(updatedTodo));
        this.loadTodos();
    }

    /**
     * Fetches all todos from the server
     */
    async loadTodos() {
        this.isLoading = true;
        const todosResult = await axios.get("/api/todoes/");
        for (let todo in todosResult.data) {
            this.updateTodoFromServer(todo);
        }
    }

    /**
     * Update a todo with information from the server. Guarantees a todo
     * only exists once. Might either construct a new todo, update an existing one,
     * or remove a todo if it has been deleted on the server.
     */
    updateTodoFromServer(json: any) {

        if (this.todos.length < 1) {
            const todo = new Todo(this, "", json.id);
            this.todos.push(todo);
        }
        var todo = this.todos.find(todo => todo.id === json.id);
        if (!todo) {
            todo = new Todo(this, "", json.id);
            this.todos.push(todo);
        }
        if (json.isDeleted) {
            this.removeTodo(todo);
        } else {
            todo.updateFromJson(json);
        }
    }


    /**
     * Creates a fresh todo on the client and server
     */
    private createTodo = () => {
        debugger;
        var todo = new Todo(this, "test", "1");
        todo.title = 'Test';
        todo.isCompleted = false;
        const test = todo.dispose;
        this.todos.push(todo);
        return todo;
    }

    /**
     * A todo was somehow deleted, clean it from the client memory
     */
    removeTodo(todo:Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        todo.dispose();
    }
}