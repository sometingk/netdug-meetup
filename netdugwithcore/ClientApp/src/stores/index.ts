import { TodoStore } from './todoStore';
import { MobxStore } from './mobxStore';
import { AnimalStore } from './animalStore';

export const stores = {
    todoStore: new TodoStore(),
    mobxStore: new MobxStore(),
    animalStore: new AnimalStore()
};