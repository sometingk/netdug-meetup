import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { IMobxStore } from '../stores/mobxStore';

interface GreetingProps {
    mobxStore?: IMobxStore
}

@inject('mobxStore')
@observer
class GreetingComponent extends Component<GreetingProps> {


    render() {
        const { name } = this.props.mobxStore!;
        return (
            <div>
                <label htmlFor="name-input">Enter a new name</label>
                <input id="name-input"
                    type="text"
                    value={name}
                    onChange={this.updateName}
                />
            </div>
        )
    }

    updateName = (e: React.FormEvent<HTMLInputElement>): void => {
        const { setName } = this.props.mobxStore!;
        setName(e.currentTarget.value);
    }

}

export default GreetingComponent;