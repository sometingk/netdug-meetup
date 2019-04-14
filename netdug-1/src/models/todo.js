import {observable} from 'mobx';

export class Todo {
    id = null;
    title = observable("");
    completed = observable(false);
}