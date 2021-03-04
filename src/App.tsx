import React from 'react';
import './App.css';
import { ArtificialHorizon } from './artificialHorizon/ArtificialHorizon';
import { Gauge } from './gauge/Gauge';
function App() {
  return (
    <div className="App">
      <ArtificialHorizon pitch={0} bank={0}></ArtificialHorizon>
      <Gauge value={0} orientation="horizontal"></Gauge>
    </div>
  );
}

export default App;
