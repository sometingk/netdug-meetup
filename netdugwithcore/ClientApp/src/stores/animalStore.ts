import { observable, action, computed } from 'mobx';
import { Animal } from '../types/animal';
import axios from 'axios';


export interface IAnimalStore {
    animals: Animal[];
    loadAnimals(): void;
    updateAnimal(animal: Animal): void;
    addAnimal(animal: Animal): void;
}

export class AnimalStore {
    @observable animals = Array<Animal>();

    constructor() {
        this.loadAnimals();
    }


    @action updateAnimal = async (animal: Animal) => {
        try {
            var result = await axios.put(`/api/animals/${animal.id}`, animal);
        } catch (err) {
            console.log(err);
        }
    }

    @action addAnimal = async (animal: Animal) => {
        var newAnimal = new Animal(this, animal.id, animal.name);
        newAnimal.saveAnimal();
        this.animals.push(newAnimal);
    }

    @action loadAnimals = async () => {
        try {
            const result = await axios.get(`/api/animals`);

            console.log(`Animals: ${JSON.stringify(result.data)}`);
            this.animals = result.data as Array<Animal>;
        } catch (err) {
            console.log(err);
        }
    }
}