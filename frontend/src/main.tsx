import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import '../bootstrap.min.css';
import './index.css';
import App from './App.tsx';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
