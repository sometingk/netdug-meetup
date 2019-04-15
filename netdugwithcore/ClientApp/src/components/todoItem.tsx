import React, { Component } from 'react';
import Todo from '../types/todo';

export interface TodoItemProps {
    todo: Todo;
}

export const TodoItem = (props: TodoItemProps) => {
    return (
        <div>props.todo.title</div>
    )
}