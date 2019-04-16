"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animal = /** @class */ (function () {
    function Animal(store, id, animalName) {
        var _this = this;
        this.name = "";
        this.store = null;
        this.changeName = function (newName) {
            _this.name = newName;
            console.log("NewName: " + _this.name);
        };
        this.saveAnimal = function () {
        };
        this.store = store;
        this.id = id;
        this.name = animalName;
    }
    Animal.prototype.updateFromJson = function (json) {
        // make sure our changes aren't sent back to the server
        this.id = json.id;
        this.name = json.name;
    };
    return Animal;
}());
exports.Animal = Animal;
//# sourceMappingURL=animal.js.map