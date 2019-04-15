import { TodoStore } from './todoStore';
import { MobxStore } from './mobxStore';

export const stores = {
    todoStore: new TodoStore(),
    mobxStore: new MobxStore()
};