import React from 'react';
import './App.css';
import { ArtificialHorizon } from './artificialHorizon/ArtificialHorizon';

function App() {
  return (
    <div className="App">
      <ArtificialHorizon pitch={0} bank={0}></ArtificialHorizon>
    </div>
  );
}

export default App;
