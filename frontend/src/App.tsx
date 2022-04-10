import { Fragment } from 'react';
import { HomePage } from './components/pages/home/home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { SignupPage } from './components/pages/authentication/SignupPage';
import { LoginPage } from './components/pages/authentication/LoginPage';
import ProtectedRoute from './components/atoms/protectedRoute';
import './css/style.scss';
import { TransactionPage } from './components/pages/TransactionPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { DashboardPage } from './components/pages/DashboardPage';
import { PageTemplateWrapper } from './components/pages/PageTemplateWrapper';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/test" element={<div>test</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/"
              element={
                <PageTemplateWrapper>
                  <DashboardPage />
                </PageTemplateWrapper>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PageTemplateWrapper>
                  <DashboardPage />
                </PageTemplateWrapper>
              }
            />
            <Route
              path="/transactions"
              element={
                <PageTemplateWrapper>
                  <TransactionPage />
                </PageTemplateWrapper>
              }
            />
            <Route
              path="/profile"
              element={
                <PageTemplateWrapper>
                  <ProfilePage />
                </PageTemplateWrapper>
              }
            />
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
