import { LoginPage } from './components/pages/auth/loginpage';
import { Fragment } from 'react';
import './App.css';
import ProtectedRoute from './components/atoms/ProtectedRoute';
import { HomePage } from './components/pages/home/home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './css/style.scss';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<div>test</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/test2" element={<div>test2</div>} />
          </Route>

          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<div>NOT FOUND</div>} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
