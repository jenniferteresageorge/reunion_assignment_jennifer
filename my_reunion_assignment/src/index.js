import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import DataTable from './advdatatable'; // Import your DataTable component
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataTable /> {/* Render your DataTable component */}
  </React.StrictMode>
);

reportWebVitals();
