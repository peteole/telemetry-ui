import React from 'react';
import './App.css';
import { ArtificialHorizon } from './artificialHorizon/ArtificialHorizon';
function App() {
  return (
    <div className="App">
      <ArtificialHorizon pitch={12.5} bank={15} heading={345} altitude={223} speed={22}></ArtificialHorizon>
    </div>
  );
}

export default App;
