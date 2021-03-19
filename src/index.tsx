import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Logic, sampleInputBuffer } from './logic';
//const socket = new WebSocket("localhost:8081")
const logic = new Logic({
  writeData: data => { },//socket.send(data),
  onData: null
})
ReactDOM.render(
  <React.StrictMode>
    <App logic={logic} />
  </React.StrictMode>,
  document.getElementById('root')
);
setTimeout(() => {
  if (logic.streamHook.onData)
    logic.streamHook.onData(sampleInputBuffer)
}, 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
