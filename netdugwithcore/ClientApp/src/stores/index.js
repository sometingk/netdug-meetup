"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var todoStore_1 = require("./todoStore");
var mobxStore_1 = require("./mobxStore");
var animalStore_1 = require("./animalStore");
exports.stores = {
    todoStore: new todoStore_1.TodoStore(),
    mobxStore: new mobxStore_1.MobxStore(),
    animalStore: new animalStore_1.AnimalStore()
};
//# sourceMappingURL=index.js.map