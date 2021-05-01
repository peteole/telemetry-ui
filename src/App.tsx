import React from 'react';
import './App.css';
import { ArtificialHorizon } from './artificialHorizon/ArtificialHorizon';
import { Logic } from './logic/logic';
import { Navigation } from './navigation/Navigation';
import { Settings } from './settings/Settings';
import { Terminal } from './terminal/Terminal';
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
        <Navigation>
          {{
            horizon: <ArtificialHorizon pitch={this.props.logic.data.pitch} bank={this.props.logic.data.bank} heading={this.props.logic.data.heading} altitude={this.props.logic.data.altitude} speed={this.props.logic.data.speed} />,
            settings: <Settings logic={this.props.logic}/>,
            terminal: <Terminal logic={this.props.logic}/>
          }}
        </Navigation>

      </div>
    );
  }
}

export default App;
