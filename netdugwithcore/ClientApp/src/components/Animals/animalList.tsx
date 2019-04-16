import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { IAnimalStore } from '../../stores/animalStore';
import { Animal } from '../../types/animal';
import AddAnimal from './addAnimal';

interface AnimalListProps {
    animalStore?: IAnimalStore
};

@inject('animalStore')
@observer
class AnimalList extends Component<AnimalListProps> {


    render() {
        //const { animals } = this.props!.animalStore;


        return (
            <div>
                <h4>Animals</h4>
                <AddAnimal />
                <ul>
                    {
                        (this.props!.animalStore && this.props!.animalStore.animals) && this.props!.animalStore.animals.map((animal, key) => {
                            return <ul key={key}>{animal.name}</ul>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default AnimalList;