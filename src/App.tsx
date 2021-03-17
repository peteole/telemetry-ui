import React from 'react';
import './App.css';
import { ArtificialHorizon } from './artificialHorizon/ArtificialHorizon';
import { Logic } from './logic';
class App extends React.Component<{ logic: Logic }, {}> {
  constructor(props: { logic: Logic }) {
    super(props)
    this.props.logic.onUpdate = () => {
      this.forceUpdate()
    }
  }
  render() {
    return (
      <div className="App">
        <ArtificialHorizon pitch={this.props.logic.data.pitch} bank={this.props.logic.data.bank} heading={this.props.logic.data.heading} altitude={this.props.logic.data.alt} speed={this.props.logic.data.speed} />
      </div>
    );
  }
}

export default App;
