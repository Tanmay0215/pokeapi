import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Type from './Type.jsx';
import NotFound from './NotFound.jsx';

createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/type/:id" element={<Type />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
);
