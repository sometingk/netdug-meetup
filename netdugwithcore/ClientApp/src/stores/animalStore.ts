import { observable, action, computed, when, reaction, autorun, flow, runInAction } from 'mobx';
import { Animal } from '../types/animal';
import axios, { AxiosResponse } from 'axios';


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

    @action addAnimal = async (id: number, name: string, details: string, count: number): Promise<Animal> => {
        const newAnimal = new Animal(id, name, details, count);
        await this.saveAnimal(newAnimal);
        return newAnimal;
    }

    saveAnimal = async (animal: Animal): Promise<Animal> => {
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
            // has to do the run in action in order to force state management only inside an action.
            // flows seem like a better option.
            runInAction(() => {
                this.animals = result.data as Array<Animal>;
            })
            
        } catch (err) {
            console.log(err);
        }
    }

    //loadingAnimals = flow(function* () {
    //    try {
    //        const results: AxiosResponse = yield axios.get(`/api/animals`);
    //        this.animals = results.data as Array<Animal>;
    //    } catch (err) {

    //        console.log(err);
    //    }
    //});

    tooMany = (a: Animal) => {
        console.log(`testing animal`);
        return a.count > 10;
    }

    // This fires once when we see the large number of animals fired.
    notifyTooMany = when(() => this.animals.some(this.tooMany),
        () => {
            const a = this.animals.find(this.tooMany);
            console.log(`We have too many ${a!.name} ${a!.count}`);
        });


    // Reaction stuff
    notifyTooManyAllTheTime = reaction(
        () => this.animals.map(animal => animal.name),
        names => console.log("Reacting to change", names.join(", "))
    )

    countReaction = reaction(
        () => this.animalCount,
        (count, reaction) => {
            console.log(`Count reaction invoked: counter count ${count}`)
        }
    );

    // autorun
    autoRunTest = autorun(
        () => console.log("Autorun: ", this.animals.map(animal => animal.name).join(", "))
    );

}