import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Animal } from '../../types/animal';
import { AnimalStore } from '../../stores/animalStore';

interface IAddAnimalProps {
   animalStore?: AnimalStore
};

interface AnimalState {
    name: string;
    id: number;
}

@inject('animalStore')
@observer
class AddAnimal extends Component<IAddAnimalProps, AnimalState> {

    constructor(props: IAddAnimalProps) {
        super(props);
        this.state = { name: "", id: 0 };
    }

    render() {
        return (
            <div>
                <label htmlFor="animalName">Animal Name:</label>
                <input type="text"
                    onChange={this.onChange}
                />
                <button onClick={this.save}>
                    Save
                </button>
            </div>
        )
    }

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        console.log(`value: ${value}`);
        this.setState({ name: e.currentTarget.value });
    }

    save = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(`firing the save event ${JSON.stringify(this.props.animalStore!)}`);
        // fire off the save here!
        const animal = new Animal(this.props.animalStore!, this.state.id, this.state.name )
    }
}

export default AddAnimal