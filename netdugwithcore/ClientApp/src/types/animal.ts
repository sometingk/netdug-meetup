import { AnimalStore } from "../stores/animalStore";
import axios from 'axios';
import { reaction, computed } from 'mobx';

export class Animal {
    id: number;
    name: string = "";
    store: any = null;
    saveHandler = reaction(
        () => this.asJson,
        (json) => {
            this.saveAnimal();
        }
    );

    constructor(store: AnimalStore, id: number, animalName: string) {
        console.log('firing constructor')
        this.store = store!;
        this.id = id;
        this.name = animalName;
    }

    changeName = (newName: string) => {
        this.name = newName;
        console.log(`NewName: ${this.name}`);
    }


    updateFromJson(json: any) {
        // make sure our changes aren't sent back to the server
        this.id = json.id;
        this.name = json.name;
    }

    saveAnimal = async () => {
        try {
            const result = await axios.post(`/api/animals`, this);
            this.store!.animals.push()
        } catch (err) {
            console.log(err);
        }


    }

    @computed get asJson() {
        console.log('asJson');
        return {
            id: this.id,
            completed: this.name
        };
    }

    dispose() {
        this.saveHandler();
    }

}