import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer, inject } from 'mobx-react';
import GreetingsComponent from './components/greetingComponent';
import { IMobxStore } from './stores/mobxStore';


interface AppProps {
  mobxStore?: IMobxStore
};

@inject('mobxStore')
@observer
class App extends Component<AppProps> {
  render() {
    const { greeting } = this.props.mobxStore!;
    return (
      <div className="App">
        <header className="App-header">
          <div >
            <label htmlFor="button">{greeting}</label>
            <button name="button" onClick={this.clickHandler}>Change Greeting</button>
          </div>
          <GreetingsComponent />
        </header>

      </div>
    );
  }


  private clickHandler = () => {
    const { setName } = this.props.mobxStore!;
    setName("Bob");
  }
}

export default App;
