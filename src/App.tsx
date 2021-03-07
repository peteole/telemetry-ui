import React from 'react';
import './App.css';
import { ArtificialHorizon } from './artificialHorizon/ArtificialHorizon';
import { Gauge } from './gauge/Gauge';
function App() {
  return (
    <div className="App">
      <ArtificialHorizon pitch={12} bank={15}></ArtificialHorizon>
      <Gauge height={50} width={600} value={340} orientation="horizontal"></Gauge>
    </div>
  );
}

export default App;
