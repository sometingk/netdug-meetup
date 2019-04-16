import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Animal } from '../../types/animal';
import { AnimalStore } from '../../stores/animalStore';
import './addAnimalStyles.css';

interface IAddAnimalProps {
    animalStore?: AnimalStore
};

interface AnimalState {
    name: string;
    id: number;
    description: string;
    count: number;
}

@inject('animalStore')
@observer
class AddAnimal extends Component<IAddAnimalProps, AnimalState> {

    constructor(props: IAddAnimalProps) {
        super(props);
        this.state = {
            name: "",
            id: 0,
            description: "",
            count: 0
        };
    }

    render() {
        return (
            <div>
                <h4>Add a new animal to inventory</h4>
                <div className="form-group">
                    <label
                        htmlFor="animalName"
                        className="label label-default"
                    >
                        Animal Name
                    </label>
                    <input type="text"
                        id="animalName"
                        name="name"
                        value={this.state.name}
                        className="form-control"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="animalDescription"
                        className="label label-default"
                    >
                        Description
                    </label>
                    <input type="text"
                        id="animalDescription"
                        name="description"
                        className="form-control"
                        onChange={this.changeDescription}
                        value={this.state.description}
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="animalCount"
                        className="label label-default"
                    >
                        On hand
                    </label>
                    <input type="text"
                        id="animalCount"
                        name="count"
                        className="form-control"
                        onChange={this.changeCount}
                        value={this.state.count}
                    />
                </div>
                <button className="btn btn-primary"
                    onClick={this.save}
                >
                    Save
                </button>
            </div>
        )
    }

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({ name: e.currentTarget.value });
    }

    changeDescription = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ description: e.currentTarget.value });
    }

    changeCount = (e: React.FormEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value);
        this.setState({ count: value });
    }

    save = async (e: React.FormEvent<HTMLButtonElement>): Promise<any> => {
        const { animalStore } = this.props;
        e.preventDefault();
        const newAnimal = new Animal(this.state.id, this.state.name, this.state.description, this.state.count);
        await animalStore!.saveAnimal(newAnimal);
        this.clearValues();
    }

    clearValues = () => {
        this.setState({ name: "", id: 0, description: "", count: 0 });
    }
}

export default AddAnimal