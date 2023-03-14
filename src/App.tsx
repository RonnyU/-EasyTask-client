import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import { AuthProvider, ProjectProvider } from './context';
import PrivateRoute from './layouts/PrivateRoute';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='sign-up' element={<SignUp />} />
              <Route path='reset-password' element={<ResetPassword />} />
              <Route path='reset-password/:token' element={<NewPassword />} />
              <Route path='confirm-account/:id' element={<ConfirmAccount />} />
            </Route>
          </Routes>
          <Routes>
            <Route path='/projects' element={<PrivateRoute />}>
              <Route index element={<Projects />} />
              <Route path='new-project' element={<NewProject />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
