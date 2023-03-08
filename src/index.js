import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Link } from "react-router-dom";
import Diary from './diary/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Diary />
    </HashRouter>
  </React.StrictMode>
);

