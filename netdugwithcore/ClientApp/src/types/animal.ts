import axios from 'axios';
import { action, computed } from 'mobx';

export class Animal {
    id: number;
    name: string = "";
    details: string = "";
    count: number = 0;

    constructor(id: number, animalName: string, details: string, count: number) {
        console.log('firing constructor')
        this.id = id;
        this.name = animalName;
        this.details = details;
        this.count = count | 0;
    }

    @computed get hasMany() {
        return this.count > 2;
    }

    @action
    changeName = (newName: string) => {
        this.name = newName;
        console.log(`NewName: ${this.name}`);
    }


    //updateFromJson(json: any) {
    //    // make sure our changes aren't sent back to the server
    //    this.id = json.id;
    //    this.name = json.name;
    //}


    //@computed get asJson() {
    //    console.log('asJson');
    //    return {
    //        id: this.id,
    //        completed: this.name
    //    };
    //}

}