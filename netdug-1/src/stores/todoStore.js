import { observable, action } from 'mobx';
import { Todo } from '../models/todo';

class TodoStore {
    todoList = observable([]);

    addTodo = action(() => {
        const todo = new Todo(this);
        this.todoList.push(todo);
    });

    removeTodo = action((todo) => {
        this.todoList.splice(this.todoList.indexOf(todo), 1);
        todo.dispose();
    });
}

export default new TodoStore();