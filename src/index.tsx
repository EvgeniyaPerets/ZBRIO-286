import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import ProviderWrapper from './ProviderWrapper';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ProviderWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
