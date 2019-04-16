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
        const { animalStore} = this.props;


        return (
            <div>
                <AddAnimal />
                <hr />
                <h4>Animals</h4>
                <ul>
                    {
                        (this.props!.animalStore && this.props!.animalStore.animals) && this.props!.animalStore.animals.map((animal, key) => {
                            return <ul key={key}>{animal.name} - {animal.details} On hand: {animal.count}</ul>
                        })
                    }
                </ul>
                <div>
                    Total animals: {animalStore!.animalCount}
                </div>
            </div>
        )
    }
}


export default AnimalList;