import { Fragment } from 'react';
import { HomePage } from './components/pages/home/home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { SignupPage } from './components/pages/authentication/SignupPage';
import { LoginPage } from './components/pages/authentication/LoginPage';
import ProtectedRoute from './components/atoms/protectedRoute';
import './css/style.scss';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
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
