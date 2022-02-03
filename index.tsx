import React from 'react';
import { render } from 'react-dom';

import Grid from './components/Grid';

import './style.css';

const App = () => (
  <div>
    <Grid />
  </div>
);

render(<App />, document.getElementById('root'));
