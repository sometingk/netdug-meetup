import { observable, action, computed } from 'mobx';
import { Animal } from '../types/animal';
import axios from 'axios';


export interface IAnimalStore {
    animalCount: number;
    animals: Animal[];
    loadAnimals(): void;
    updateAnimal(animal: Animal): void;
    addAnimal(animal: Animal): void;
}

export class AnimalStore {
    @observable animals = Array<Animal>();
    @computed get animalCount() {
        let count = 0;
        for (let animal of this.animals) {
            count += animal.count;
        }
        return count;
    }

    constructor() {
        this.loadAnimals();
    }


    @action updateAnimal = async (animal: Animal) => {
        try {
            const result = await axios.put(`/api/animals/${animal.id}`, animal);
        } catch (err) {
            console.log(err);
        }
    }

    @action addAnimal = async (id: number, name: string, details:string, count:number): Promise<Animal> => {
        const newAnimal = new Animal(id, name, details, count);
        await this.saveAnimal(newAnimal);
        return newAnimal;
    }

    saveAnimal = async (animal: Animal): Promise<Animal>  => {
        try {
            console.log(`saving animal: ${JSON.stringify(animal)}`);
            const result = await axios.post(`/api/animals`, animal);
            var createdAnimal = result.data as Animal;
            this.animals.push(createdAnimal);
            return createdAnimal;
        } catch (err) {
            console.log(`Error: ${err}`);
            return new Animal(0, "", "", 0);
        }
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