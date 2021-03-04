import React from 'react';
import './App.css';
import { ArtificialHorizon } from './artificialHorizon/ArtificialHorizon';
import { Gauge } from './gauge/Gauge';
function App() {
  return (
    <div className="App">
      <ArtificialHorizon pitch={0} bank={0}></ArtificialHorizon>
      <Gauge height={400} width={50} value={0} orientation="vertical"></Gauge>
    </div>
  );
}

export default App;
