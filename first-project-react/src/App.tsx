import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import RoutesApp from "./routes";

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
    <GlobalStyle />
  </>
)

export default App;
