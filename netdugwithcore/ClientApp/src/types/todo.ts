import { observable, autorun, reaction, computed } from 'mobx';
import uuid from 'uuid';
import axios from 'axios';

export default class Todo {
    id: number;
    title: string;
    isCompleted: boolean;


    store:any = null;
    autoSave: boolean = true;

    saveHandler:any = null;
    url:string = `api/todoes`;

    constructor(store: any, id: any = uuid.v4()) {

        console.log(`firing the constructor ${JSON.stringify(this)}`);
        this.store = store;
        this.id = id;
        this.title = "";
        this.isCompleted = false;


        this.saveHandler = reaction(
            // observe everything that is used in the JSON:
            () => this.asJson,
            // if autoSave is on, send json to server
            async (json) => {
                console.log(`Firing the call to the transport layer. ${JSON.stringify(json)}`);
                if (this.autoSave) {
                    const result = await axios.post(`api/Todoes`, json);
                    console.log(`Data: ${JSON.stringify(result.data)}`);
                }
            }
        );
    }

    delete = async () => {
        try {
            const result = await axios.delete(`${this.url}/${this.id}`);
            const data = result.data;
            this.store.removeTodo(this);
        } catch (err) {
            console.log(`Error : ${err}`);
        } finally {
        }
    }


    @computed get asJson() {
        console.log(`Computing the asJson.`);
        return {
            id: this.id,
            isCompleted: this.isCompleted,
            title: this.title
        }
    }

    updateFromJson(json: any) {
        this.autoSave = false;
        this.isCompleted = json.isCompleted;
        this.title = json.title;
        this.autoSave = true;
    }

    dispose() {
        // clean up the observer
        this.saveHandler();
    }
}