import { observable, action, computed } from 'mobx';

export interface IMobxStore {
    name: string;
    greeting: string;
    setName(name:string): void;
}

export class MobxStore {
    @observable name = '';

    @computed 
    public get greeting():string {
        return `Hello ${this.name}`;
    }

    @action.bound
    public setName(name:string):void {
        this.name = name;
    }
}