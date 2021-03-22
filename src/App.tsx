import React from 'react';
import './App.css';
import { ArtificialHorizon } from './artificialHorizon/ArtificialHorizon';
class App extends React.Component<{},{time:number}> {
  constructor(props:{}){
    super(props)
    this.state={time:0}
    window.setInterval(()=>{
      this.setState({time:this.state.time+0.5})
    },50)
  }
  render(){
  return (
    <div className="App">
      <ArtificialHorizon pitch={Math.sin(this.state.time/50)* 12.5} bank={Math.sin(this.state.time/50)*25} heading={-Math.cos(this.state.time/50)*45+345} altitude={-Math.cos(this.state.time/50)*100+223} speed={-Math.sin(this.state.time/50)*10+22}></ArtificialHorizon>
    </div>
  );
  }
}

export default App;
