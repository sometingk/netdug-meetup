import { observable, autorun, reaction, computed } from 'mobx';
import uuid from 'uuid';
import axios from 'axios';
import { debug } from 'util';
import { TodoStore } from '../stores/todoStore';

interface ITodo {
    id: string,
    title: string,
    isCompleted: boolean
}

export default class Todo implements ITodo {
    /**
         * unique id of this todo, immutable.
         */
    id = "";

    @observable isCompleted = false;
    @observable title = "";

    store: any = null;

    /**
     * Indicates whether changes in this object
     * should be submitted to the server
     */
    autoSave: boolean = true;

    /**
     * 
     * Disposer for the side effect that automatically
     * stores this Todo, see @dispose.
     */
    saveHandler: any = null;
    constructor(store: TodoStore, title: string, id: string) {
        console.log('got here');
        this.title = title;
        this.store = store;
        this.id = id;
        this.isCompleted = false;
    }

    /**
     * Remove this todo from the client and server
     */
    delete() {
        this.store.transportLayer.deleteTodo(this.id);
        this.store.removeTodo(this);
    }

    @computed get asJson() {
        return {
            id: this.id,
            isCompleted: this.isCompleted,
            title: this.title,
        };
    }

    /**
     * Update this todo with information from the server
     */
    updateFromJson(json: any) {
        // make sure our changes aren't sent back to the server
        this.autoSave = false;
        this.isCompleted = json.isCompleted;
        this.title = json.title;
        this.autoSave = true;
    }

    dispose = () => {
        // clean up the observer
        this.saveHandler();
    }

}